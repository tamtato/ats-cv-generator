import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

import { useCvStore } from '../../stores/cvStore';
import ExportJson from "../EditorSidebar/sections/ExportJSON.vue";

describe('ImportExportActions.vue', () => {
    let wrapper: any;
    let store: any;

    beforeEach(() => {
        vi.restoreAllMocks();

        window.alert = vi.fn();
        window.URL.createObjectURL = vi.fn(() => 'blob:mock');
        window.URL.revokeObjectURL = vi.fn();
        vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

        wrapper = mount(ExportJson, {
            global: {
                plugins: [
                    createTestingPinia({
                        stubActions: false,
                        createSpy: vi.fn
                    })
                ],
            },
        });

        store = useCvStore();
        store.cvData = {
            header: { name: '', email: '', title: '', phone: '', location: '', github: '', linkedin: '' },
            summary: '',
            experience: [],
            skills: []
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('creates a downloadable JSON blob when Export is clicked', async () => {
        const exportBtn = wrapper.find('[data-testid="exportJson-button"]');
        await exportBtn.trigger('click');

        expect(window.URL.createObjectURL).toHaveBeenCalledOnce();
        expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledOnce();
        expect(window.URL.revokeObjectURL).toHaveBeenCalledOnce();
    });

    it('successfully parses valid imported JSON', async () => {
        window.FileReader = class {
            onload: any = null;
            readAsText() {
                if (this.onload) {
                    this.onload({ target: { result: JSON.stringify({ header: { name: 'Imported Tester' } }) } });
                }
            }
        } as any;

        const fileInput = wrapper.find('[data-testid="importJson-input"]');
        Object.defineProperty(fileInput.element, 'files', {
            value: [new File([''], 'test.json')]
        });

        await fileInput.trigger('change');

        expect(store.cvData.header.name).toBe('Imported Tester');
    });

    it('alerts the user if imported JSON is invalid', async () => {
        window.FileReader = class {
            onload: any = null;
            readAsText() {
                if (this.onload) {
                    this.onload({ target: { result: 'this is not valid json' } });
                }
            }
        } as any;

        const fileInput = wrapper.find('[data-testid="importJson-input"]');
        Object.defineProperty(fileInput.element, 'files', {
            value: [new File([''], 'test.json')]
        });

        await fileInput.trigger('change');

        expect(window.alert).toHaveBeenCalledWith('Invalid JSON file');
    });
});