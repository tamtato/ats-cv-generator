import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useCvStore } from '../../stores/cvStore';
import { CvThemes } from '../../types/themes';
import CvPreview from '../CvPreview/index.vue';
import BasicTheme from '../CvPreview/BasicTheme/index.vue';
import ThemeTwo from '../CvPreview/ThemeTwo/index.vue';

describe('CvPreview.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;
    let resizeCallback: (entries: any[]) => void;

    beforeEach(() => {
        // Advanced ResizeObserver mock to simulate element resizing
        global.ResizeObserver = class ResizeObserver {
            constructor(cb: (entries: any[]) => void) {
                resizeCallback = cb;
            }
            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
        } as any;

        wrapper = mount(CvPreview, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
            },
        });

        store = useCvStore();
        store.cvData = {
            selectedTheme: CvThemes.BASIC,
            header: {
                name: 'Test User',
            },
            summary: '',
            experience: [],
            skills: [],
            education: []
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
        vi.restoreAllMocks();
    });

    // Simulates the content div changing height
    const triggerResize = async (height: number) => {
        resizeCallback([{ contentRect: { height } }]);
        await wrapper.vm.$nextTick(); // Wait for Vue to update the DOM based on new pageCount
    };

    describe('Theme Rendering Logic', () => {
        it('renders the BasicTheme by default', async () => {
            store.cvData.selectedTheme = CvThemes.BASIC;
            await flushPromises();

            expect(wrapper.findComponent(BasicTheme).exists()).toBe(true);
            expect(wrapper.findComponent(ThemeTwo).exists()).toBe(false);
        });

        it('switches to ThemeTwo when the store updates', async () => {
            store.cvData.selectedTheme = CvThemes.THEME_TWO;
            await flushPromises();

            expect(wrapper.findComponent(ThemeTwo).exists()).toBe(true);
            expect(wrapper.findComponent(BasicTheme).exists()).toBe(false);
        });
    });

    describe('Pagination & Cut-Line Logic', () => {
        it('renders only 1 page when content height is below the capacity threshold', async () => {
            await triggerResize(500); // 500px is less than 995.9px

            // Should show "Page 1"
            expect(wrapper.text()).toContain('Page 1');

            // Should NOT show "Page 2" or any cut lines
            expect(wrapper.text()).not.toContain('Page 2');
            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(0);
        });

        it('calculates 2 pages when content height exceeds 1 page capacity', async () => {
            await triggerResize(1200); // 1200 / 995.9 = 1.2 -> ceil(1.2) = 2 pages

            // Should show both pages
            expect(wrapper.text()).toContain('Page 1');
            expect(wrapper.text()).toContain('Page 2');

            // Should render exactly 1 cut line
            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(1);
        });

        it('calculates 4 pages for very tall content', async () => {
            await triggerResize(3500); // 3500 / 995.9 = 3.51 -> ceil(3.51) = 4 pages

            expect(wrapper.text()).toContain('Page 1');
            expect(wrapper.text()).toContain('Page 2');
            expect(wrapper.text()).toContain('Page 3');
            expect(wrapper.text()).toContain('Page 4');
            expect(wrapper.text()).not.toContain('Page 5');

            // 4 pages means 3 cut lines
            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(3);
        });

        it('never drops below 1 page even if content is 0px', async () => {
            await triggerResize(0);

            expect(wrapper.text()).toContain('Page 1');
            const cutLines = wrapper.findAll('.border-dashed');
            expect(cutLines.length).toBe(0);
        });
    });
});