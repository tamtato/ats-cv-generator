import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CvSummaryEditor from '../../EditorSidebar/CvSummaryEditor.vue';
import { useCvStore } from '../../../stores/cvStore.ts';

describe('CvSummaryEditor.vue', () => {
    let wrapper: any;
    let store: any;

    beforeEach(() => {
        wrapper = mount(CvSummaryEditor, {
            global: {
                plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn, })],
            },
        });

        store = useCvStore();

        // Set baseline state
        store.cvData = {
            summary: ''
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('updates the store when the user types in the textarea', async () => {
        const textarea = wrapper.find('[data-testid="summary"]');

        await textarea.setValue('An experienced frontend developer focused on Vue and Astro.');

        expect(store.cvData.summary).toBe('An experienced frontend developer focused on Vue and Astro.');
    });

    it('safely escapes malicious HTML injected into the textarea', async () => {
        const maliciousScript = '<script>alert("hacked")</script>';
        const textarea = wrapper.find('[data-testid="summary"]');

        await textarea.setValue(maliciousScript);

        expect(store.cvData.summary).toBe(maliciousScript);

        // Proves Vue escaped the brackets and didn't create an actual script tag in the DOM
        expect(wrapper.html()).not.toContain('<script>alert("hacked")</script>');

        // Proves the raw text is still safely bound to the input's value
        expect((textarea.element as HTMLTextAreaElement).value).toBe(maliciousScript);
    });
});