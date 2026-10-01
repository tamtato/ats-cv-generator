import {mount, VueWrapper} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import CvPreview from '../CvBuilderApp/CvPreview/CvPreview.vue';

describe('CvPreview.vue', () => {
    let wrapper: VueWrapper<any>;
    let observerCallbacks: ((entries: any[]) => void)[] = [];

    beforeEach(() => {
        observerCallbacks = [];

        global.ResizeObserver = class ResizeObserver {
            constructor(cb: (entries: any[]) => void) {
                observerCallbacks.push(cb);
            }

            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
        } as any;

        wrapper = mount(CvPreview, {
            global: {
                plugins: [createTestingPinia({stubActions: false, createSpy: vi.fn})],
                stubs: {
                    CvLayout: true,
                },
            },
        });
    });

    afterEach(() => {
        wrapper?.unmount();
        vi.restoreAllMocks();
    });

    // Simulates content container height changes (contentObserver)
    const triggerContentResize = async (height: number) => {
        observerCallbacks[0]([{contentRect: {height}}]);
        await wrapper.vm.$nextTick();
    };

    // Simulates outer container width changes (wrapperObserver)
    const triggerWrapperResize = async (width: number) => {
        observerCallbacks[1]([{contentRect: {width}}]);
        await wrapper.vm.$nextTick();
    };

    describe('Pagination & Cut-Line Logic', () => {
        it('renders 0 cut lines and single-page minHeight when content height is within 1 page', async () => {
            await triggerContentResize(500); // 500 < 995.9px -> 1 page

            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(0);

            const paper = wrapper.find('.cv-paper');
            expect(paper.attributes('style')).toContain('min-height: calc(3cm + (1 * 266mm))');
        });

        it('calculates 2 pages and renders 1 cut line when content exceeds 1 page', async () => {
            await triggerContentResize(1200); // 1200 / 995.9 = 1.2 -> 2 pages

            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(1);
            expect(cutLines[0].attributes('style')).toContain('top: calc(1.5cm + 266mm)');

            const paper = wrapper.find('.cv-paper');
            expect(paper.attributes('style')).toContain('min-height: calc(3cm + (2 * 266mm))');
        });

        it('calculates 4 pages and renders 3 cut lines for tall content', async () => {
            await triggerContentResize(3500); // 3500 / 995.9 = 3.51 -> 4 pages

            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(3);
            expect(cutLines[0].attributes('style')).toContain('top: calc(1.5cm + 266mm)');
            expect(cutLines[1].attributes('style')).toContain('top: calc(1.5cm + 532mm)');
            expect(cutLines[2].attributes('style')).toContain('top: calc(1.5cm + 798mm)');

            const paper = wrapper.find('.cv-paper');
            expect(paper.attributes('style')).toContain('min-height: calc(3cm + (4 * 266mm))');
        });

        it('never drops below 1 page even if content height is 0px', async () => {
            await triggerContentResize(0);

            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(0);

            const paper = wrapper.find('.cv-paper');
            expect(paper.attributes('style')).toContain('min-height: calc(3cm + (1 * 266mm))');
        });
    });

    describe('Responsive Scaling Logic', () => {
        it('scales down preview when container is narrower than A4_WIDTH_PX + 48 (842px)', async () => {
            await triggerWrapperResize(421); // 421 / 842 = 0.5 scale

            const paper = wrapper.find('.cv-paper');
            expect(paper.attributes('style')).toContain('transform: scale(0.5)');
        });

        it('keeps scale at 1 when container width is greater than or equal to 842px', async () => {
            await triggerWrapperResize(1000);

            const paper = wrapper.find('.cv-paper');
            expect(paper.attributes('style')).toContain('transform: scale(1)');
        });
    });
});