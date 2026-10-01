import {mount, VueWrapper} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import EducationConfig from '../CvBuilderApp/CvConfig/configs/EducationConfig.vue';
import {useCvStore} from '../../stores/cvStore';

describe('EducationConfig.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(EducationConfig, {
            global: {
                plugins: [createTestingPinia({stubActions: false, createSpy: vi.fn})],
            },
        });

        store = useCvStore();
        store.cvData = {
            education: []
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('adds a new education when clicking the Add Education button', async () => {
        const addEducationBtn = wrapper.find('[data-testid="addEducation"]')!;
        await addEducationBtn.trigger('click');

        expect(store.cvData.education.length).toBe(1);
        expect(store.cvData.education[0]).toHaveProperty('title', '');
    });

    it('removes a education when clicking the Remove Education button', async () => {
        store.cvData.education = [{
            id: '1',
            title: 'Developer',
            school: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false
        }];
        await wrapper.vm.$nextTick();

        const removeEducationBtn = wrapper.find('[data-testid="removeEducation"]')!;
        await removeEducationBtn.trigger('click');

        expect(store.cvData.education.length).toBe(0);
    });


    it('updates education details when user types in inputs', async () => {
        store.cvData.education = [{
            id: '1',
            title: '',
            school: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false
        }];
        await wrapper.vm.$nextTick();

        const titleInput = wrapper.find('[data-testid="education-title-text-field"]');
        const schoolInput = wrapper.find('[data-testid="school-text-field"]');
        const startDateInput = wrapper.find('[data-testid="start-date-text-field"]');
        const endDateInput = wrapper.find('[data-testid="end-date-text-field"]');
        const descriptionTextarea = wrapper.find('[data-testid="description-text-field"]');

        await titleInput.setValue('Frontend Developer');
        await schoolInput.setValue('Tech Corp');
        await startDateInput.setValue('2023-01');
        await endDateInput.setValue('2023-01');
        await descriptionTextarea.setValue('Built scalable web apps.');

        expect(store.cvData.education[0].title).toBe('Frontend Developer');
        expect(store.cvData.education[0].school).toBe('Tech Corp');
        expect(store.cvData.education[0].startDate).toBe('2023-01');
        expect(store.cvData.education[0].endDate).toBe('2023-01');
        expect(store.cvData.education[0].description).toBe('Built scalable web apps.');
    });
});