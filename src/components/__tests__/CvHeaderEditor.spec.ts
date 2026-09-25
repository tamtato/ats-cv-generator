import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CvHeaderEditor from '../CvBuilderApp/EditorSidebar/sections/CvHeaderEditor.vue';
import { useCvStore } from '../../stores/cvStore';

describe('CvHeaderEditor.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(CvHeaderEditor, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })],
            },
        });

        store = useCvStore();

        // Set baseline state
        store.cvData = {
            header: {
                name: '',
                title: '',
                email: '',
                phone: '',
                location: '',
                github: '',
                linkedin: ''
            }
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('updates the store when the user types in text inputs', async () => {
        const nameInput = wrapper.find('input[data-testid="fullName"]');
        const titleInput = wrapper.find('input[data-testid="title"]');

        await nameInput.setValue('Jane Doe');
        await titleInput.setValue('Frontend Developer');

        expect(store.cvData.header.name).toBe('Jane Doe');
        expect(store.cvData.header.title).toBe('Frontend Developer');

        const emailInput = wrapper.find('input[data-testid="email"]');
        await emailInput.setValue('jane@example.com');
        expect(store.cvData.header.email).toBe('jane@example.com');
    });

    it('strips url protocols from github and linkedin on blur', async () => {
        const githubInput = wrapper.find('input[data-testid="github"]');
        const linkedinInput = wrapper.find('input[data-testid="linkedin"]');

        // Simulate pasting a full URL
        await githubInput.setValue('https://github.com/janedoe');
        await githubInput.trigger('blur');
        expect(store.cvData.header.github).toBe('github.com/janedoe');

        // Simulate pasting a malicious javascript protocol
        await linkedinInput.setValue('javascript:alert(1)');
        await linkedinInput.trigger('blur');
        expect(store.cvData.header.linkedin).toBe('alert(1)');
    });
});