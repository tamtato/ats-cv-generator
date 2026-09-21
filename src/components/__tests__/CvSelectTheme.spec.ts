import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CvSelectTheme from '../EditorSidebar/sections/CvSelectTheme.vue';
import { useCvStore } from '../../stores/cvStore';
import {CvThemes} from "../../types/themes/themeTypes.ts";

describe('CvThemeSelector.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(CvSelectTheme, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
            },
        });

        store = useCvStore();

        store.cvData = {
            selectedTheme: CvThemes.DEFAULT,
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('updates the store when a new theme is selected', async () => {
        const themeSelect = wrapper.find('[data-testid="themeSelect"]');
        await themeSelect.setValue(CvThemes.THEME_ONE);
        expect(store.cvData.selectedTheme).toBe(CvThemes.THEME_ONE);
    });
});

