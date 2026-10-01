import {mount, VueWrapper} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import ThemeConfig from '../CvBuilderApp/CvConfig/configs/ThemeConfig.vue';
import {useCvStore} from '../../stores/cvStore';
import {CvThemes} from '../../types/themes/themeTypes';
import {atsSafeFonts} from '../../types/themes/fonts';

describe('ThemeConfig.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        const pinia = createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
            initialState: {
                cv: {
                    cvData: {
                        theme: {
                            selectedHeaderFont: Object.values(atsSafeFonts)[0],
                            selectedBodyFont: Object.values(atsSafeFonts)[0],
                            selectedTheme: CvThemes.DEFAULT,
                            selectedColor: '#b30909',
                        }
                    }
                }
            }
        });

        store = useCvStore(pinia);

        wrapper = mount(ThemeConfig, {
            global: {
                plugins: [pinia],
            },
        });
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('updates the store when a new theme is selected', async () => {
        const themeTrigger = wrapper.find('[data-testid="themes-select"]');
        await themeTrigger.trigger('click');

        const option = wrapper.find(`[data-testid="themes-select-option-${CvThemes.THEME_ONE}"]`);
        await option.trigger('click');

        expect(store.cvData.theme.selectedTheme).toBe(CvThemes.THEME_ONE);
    });
});