import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CvSelectFontAndColor from '../EditorSidebar/CvSelectFontAndColor.vue';
import { useCvStore } from '../../stores/cvStore';

describe('CvSelectFontAndColor.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(CvSelectFontAndColor, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
            },
        });

        store = useCvStore();

        store.cvData = {
            selectedFont: 'Arial, sans-serif',
            selectedColor: '#000000'
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('updates the store when a new font is selected', async () => {
        const fontSelect = wrapper.find('[data-testid="fontSelect"]');
        await fontSelect.setValue('Georgia, serif');

        expect(store.cvData.selectedFont).toBe('Georgia, serif');
    });

    it('updates the store when a new color is selected', async () => {
        const colorInput = wrapper.find('[data-testid="colorPicker"]');
        await colorInput.setValue('#ff0000');

        expect(store.cvData.selectedColor).toBe('#ff0000');
    });
});