import {mount, VueWrapper} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import ExportJson from '../CvBuilderApp/SidebarMenu/ExportJSON.vue';
import {useCvStore} from '../../stores/cvStore';

describe('ExportJSON.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        vi.restoreAllMocks();

        window.URL.createObjectURL = vi.fn(() => 'blob:mock');
        window.URL.revokeObjectURL = vi.fn();
        vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
        });

        wrapper = mount(ExportJson, {
            global: {
                plugins: [createTestingPinia({stubActions: false, createSpy: vi.fn})],
            },
        });

        store = useCvStore();
    });

    afterEach(() => {
        wrapper?.unmount();
    });

    it('creates a downloadable JSON blob when Export is clicked', async () => {
        const exportBtn = wrapper.find('[data-testid="exportJson-button"]');
        await exportBtn.trigger('click');

        expect(window.URL.createObjectURL).toHaveBeenCalledOnce();
        expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledOnce();
        expect(window.URL.revokeObjectURL).toHaveBeenCalledOnce();
    });
});