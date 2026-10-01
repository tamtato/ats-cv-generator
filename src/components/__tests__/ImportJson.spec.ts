import {mount, VueWrapper} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import ImportJson from '../CvBuilderApp/SidebarMenu/ImportJSON.vue';
import {useCvStore} from '../../stores/cvStore';

describe('ImportJSON.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        vi.restoreAllMocks();
        window.alert = vi.fn();

        wrapper = mount(ImportJson, {
            global: {
                plugins: [createTestingPinia({stubActions: false, createSpy: vi.fn})],
            },
        });

        store = useCvStore();
    });

    afterEach(() => {
        wrapper?.unmount();
    });

    it('triggers the hidden file input when the button is clicked', async () => {
        const fileInput = wrapper.find<HTMLInputElement>('[data-testid="importJson-input"]');
        const clickSpy = vi.spyOn(fileInput.element, 'click');

        await wrapper.find('button').trigger('click');

        expect(clickSpy).toHaveBeenCalledOnce();
    });

    it('successfully parses valid imported JSON into store', async () => {
        window.FileReader = class {
            onload: any = null;

            readAsText() {
                if (this.onload) {
                    this.onload({
                        target: {
                            result: JSON.stringify({
                                header: {name: 'Imported Tester'},
                            }),
                        },
                    });
                }
            }
        } as any;

        const fileInput = wrapper.find('[data-testid="importJson-input"]');
        Object.defineProperty(fileInput.element, 'files', {
            value: [new File([''], 'cv.json', {type: 'application/json'})],
        });

        await fileInput.trigger('change');

        expect(store.cvData.header.name).toBe('Imported Tester');
    });

    it('alerts the user if imported JSON is malformed', async () => {
        window.FileReader = class {
            onload: any = null;

            readAsText() {
                if (this.onload) {
                    this.onload({target: {result: 'invalid-json'}});
                }
            }
        } as any;

        const fileInput = wrapper.find('[data-testid="importJson-input"]');
        Object.defineProperty(fileInput.element, 'files', {
            value: [new File([''], 'cv.json', {type: 'application/json'})],
        });

        await fileInput.trigger('change');

        expect(window.alert).toHaveBeenCalledWith('Invalid JSON file');
    });
});