import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import ExperienceForm from '../CvBuilderApp/FormContainer/forms/ExperienceForm.vue';
import { useCvStore } from '../../stores/cvStore';

describe('ExperienceForm.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(ExperienceForm, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
            },
        });

        store = useCvStore();

        // Set baseline state with zero jobs
        store.cvData = {
            experience: []
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('adds a new job role when clicking the Add Role button', async () => {
        const addRoleBtn = wrapper.find('[data-testid="addJob"]')!;
        await addRoleBtn.trigger('click');

        expect(store.cvData.experience.length).toBe(1);
        expect(store.cvData.experience[0]).toHaveProperty('title', '');
        expect(store.cvData.experience[0].bullets.length).toBe(1); // Should initialize with one empty bullet
    });

    it('removes a job role when clicking the Remove Role button', async () => {
        // Seed store with one job
        store.cvData.experience = [{ id: '1', title: 'Developer', company: '', startDate: '', endDate: '', bullets: [] }];
        await wrapper.vm.$nextTick();

        const removeRoleBtn = wrapper.find('[data-testid="removeJob"]')!;
        await removeRoleBtn.trigger('click');

        expect(store.cvData.experience.length).toBe(0);
    });

    it('adds a new bullet point when clicking Add Bullet Point', async () => {
        store.cvData.experience = [{ id: '1', title: 'Developer', company: '', startDate: '', endDate: '', bullets: ['Initial bullet'] }];
        await wrapper.vm.$nextTick();

        const addBulletBtn = wrapper.find('[data-testid="addBullet"]');
        await addBulletBtn.trigger('click');

        expect(store.cvData.experience[0].bullets.length).toBe(2);
    });

    it('removes a bullet point when clicking the remove bullet button', async () => {
        store.cvData.experience = [{ id: '1', title: 'Developer', company: '', startDate: '', endDate: '', bullets: ['Keep me', 'Delete me'] }];
        await wrapper.vm.$nextTick();

        // The second '✕' button corresponds to the second bullet
        const removeBulletBtns = wrapper.findAll('[data-testid="removeBullet"]');
        await removeBulletBtns[1].trigger('click');

        expect(store.cvData.experience[0].bullets.length).toBe(1);
        expect(store.cvData.experience[0].bullets[0]).toBe('Keep me');
    });

    it('updates job details when user types in inputs', async () => {
        store.cvData.experience = [{ id: '1', title: '', company: '', startDate: '', endDate: '', bullets: [''] }];
        await wrapper.vm.$nextTick();

        const titleInput = wrapper.find('[data-testid="jobTitle"]');
        const companyInput = wrapper.find('[data-testid="company"]');
        const startDateInput = wrapper.find('[data-testid="startDate"]');
        const endDateInput = wrapper.find('[data-testid="endDate"]');
        const bulletTextarea = wrapper.find('[data-testid="bulletPoint"]');

        await titleInput.setValue('Frontend Developer');
        await companyInput.setValue('Tech Corp');
        await startDateInput.setValue('Jan 2023');
        await endDateInput.setValue('Present');
        await bulletTextarea.setValue('Built scalable web apps.');

        expect(store.cvData.experience[0].title).toBe('Frontend Developer');
        expect(store.cvData.experience[0].company).toBe('Tech Corp');
        expect(store.cvData.experience[0].startDate).toBe('Jan 2023');
        expect(store.cvData.experience[0].endDate).toBe('Present');
        expect(store.cvData.experience[0].bullets[0]).toBe('Built scalable web apps.');
    });
});