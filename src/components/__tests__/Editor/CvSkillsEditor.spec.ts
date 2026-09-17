import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CvSkillsEditor from '../../EditorSidebar/CvSkillsEditor.vue';
import { useCvStore } from '../../../stores/cvStore.ts';

describe('CvSkillsEditor.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(CvSkillsEditor, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
            },
        });

        store = useCvStore();

        // Set baseline state
        store.cvData = {
            skills: []
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('adds a new skill category when clicking the Add button', async () => {
        const addSkillBtn = wrapper.find('[data-testid="addSkill"]');
        await addSkillBtn.trigger('click');

        expect(store.cvData.skills.length).toBe(1);
        expect(store.cvData.skills[0]).toEqual({ category: '', items: '' });
    });

    it('removes a skill category when clicking the Remove button', async () => {
        // Seed store with one skill category
        store.cvData.skills = [{ category: 'Languages', items: 'JavaScript, TypeScript' }];
        await wrapper.vm.$nextTick();

        const removeSkillBtn = wrapper.find('[data-testid="removeSkill"]');
        await removeSkillBtn.trigger('click');

        expect(store.cvData.skills.length).toBe(0);
    });

    it('updates skill details when user types in inputs', async () => {
        // Seed store with an empty skill block
        store.cvData.skills = [{ category: '', items: '' }];
        await wrapper.vm.$nextTick();

        const categoryInput = wrapper.find('[data-testid="skillCategory"]');
        const itemsTextarea = wrapper.find('[data-testid="skillItems"]');

        await categoryInput.setValue('Frontend Frameworks');
        await itemsTextarea.setValue('Vue 3, React, Astro');

        expect(store.cvData.skills[0].category).toBe('Frontend Frameworks');
        expect(store.cvData.skills[0].items).toBe('Vue 3, React, Astro');
    });

    it('initializes the skills array if it is undefined when adding a skill', async () => {
        // Force skills to be undefined to test the fallback logic
        store.cvData.skills = undefined;
        await wrapper.vm.$nextTick();

        const addSkillBtn = wrapper.find('[data-testid="addSkill"]');
        await addSkillBtn.trigger('click');

        expect(store.cvData.skills).toBeDefined();
        expect(store.cvData.skills.length).toBe(1);
    });
});