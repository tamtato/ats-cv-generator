import {mount, VueWrapper} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import ExperienceConfig from '../CvBuilderApp/CvConfig/configs/ExperienceConfig.vue';
import {useCvStore} from '../../stores/cvStore';

describe('ExperienceConfig.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(ExperienceConfig, {
            global: {
                plugins: [createTestingPinia({stubActions: false, createSpy: vi.fn})],
            },
        });

        store = useCvStore();

        // Set baseline state with zero experiences
        store.cvData = {
            experience: []
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('adds a new experience role when clicking the Add Role button', async () => {
        const addRoleBtn = wrapper.find('[data-testid="addExp"]')!;
        await addRoleBtn.trigger('click');

        expect(store.cvData.experience.length).toBe(1);
        expect(store.cvData.experience[0]).toHaveProperty('title', '');
        expect(store.cvData.experience[0].bullets.length).toBe(1); // Should initialize with one empty bullet
    });

    it('removes a experience role when clicking the Remove Role button', async () => {
        // Seed store with one experience
        store.cvData.experience = [{
            id: '1',
            title: 'Developer',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            bullets: []
        }];
        await wrapper.vm.$nextTick();

        const removeRoleBtn = wrapper.find('[data-testid="removeExp"]')!;
        await removeRoleBtn.trigger('click');

        expect(store.cvData.experience.length).toBe(0);
    });

    it('adds a new bullet point when clicking Add Bullet Point', async () => {
        store.cvData.experience = [{
            id: '1',
            title: 'Developer',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            bullets: ['Initial bullet']
        }];
        await wrapper.vm.$nextTick();

        const addBulletBtn = wrapper.find('[data-testid="addBullet"]');
        await addBulletBtn.trigger('click');

        expect(store.cvData.experience[0].bullets.length).toBe(2);
    });

    it('removes a bullet point when clicking the remove bullet button', async () => {
        store.cvData.experience = [{
            id: '1',
            title: 'Developer',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            bullets: ['Keep me', 'Delete me']
        }];
        await wrapper.vm.$nextTick();

        // The second '✕' button corresponds to the second bullet
        const removeBulletBtns = wrapper.findAll('[data-testid="removeBullet"]');
        await removeBulletBtns[1].trigger('click');

        expect(store.cvData.experience[0].bullets.length).toBe(1);
        expect(store.cvData.experience[0].bullets[0]).toBe('Keep me');
    });

    it('updates experience details when user types in inputs', async () => {
        store.cvData.experience = [{
            id: '1',
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            bullets: ['']
        }];
        await wrapper.vm.$nextTick();

        const titleInput = wrapper.find('[data-testid="experience-title-text-field"]');
        const companyInput = wrapper.find('[data-testid="company-text-field"]');
        const startDateInput = wrapper.find('[data-testid="start-date-text-field"]');
        const endDateInput = wrapper.find('[data-testid="end-date-text-field"]');
        const bulletTextarea = wrapper.find('[data-testid="bulletPoint"] textarea');

        await titleInput.setValue('Frontend Developer');
        await companyInput.setValue('Tech Corp');
        await startDateInput.setValue('2023-01');
        await endDateInput.setValue('2023-01');
        await bulletTextarea.setValue('Built scalable web apps.');

        expect(store.cvData.experience[0].title).toBe('Frontend Developer');
        expect(store.cvData.experience[0].company).toBe('Tech Corp');
        expect(store.cvData.experience[0].startDate).toBe('2023-01');
        expect(store.cvData.experience[0].endDate).toBe('2023-01');
        expect(store.cvData.experience[0].bullets[0]).toBe('Built scalable web apps.');
    });
});