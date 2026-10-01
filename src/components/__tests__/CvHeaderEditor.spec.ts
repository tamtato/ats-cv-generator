import {mount, VueWrapper} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import HeaderConfig from '../CvBuilderApp/CvConfig/configs/HeaderConfig.vue';
import {useCvStore} from '../../stores/cvStore';

describe('HeaderConfig.vue', () => {
    let wrapper: VueWrapper<any>;
    let store: any;

    beforeEach(() => {
        wrapper = mount(HeaderConfig, {
            global: {
                plugins: [createTestingPinia({stubActions: false, createSpy: vi.fn})],
            },
        });

        store = useCvStore();

        // Set baseline state
        store.cvData = {
            summary: '',
            header: {
                name: '',
                title: '',
                email: '',
                phone: '',
                location: '',
                additionalLinks: [''],
                linkedin: ''
            }
        };
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    it('updates the store when the user types in text inputs', async () => {
        const nameInput = wrapper.find('input[data-testid="your-name-text-field"]');
        const titleInput = wrapper.find('input[data-testid="what-is-it-you-do-text-field"]');

        await nameInput.setValue('Jane Doe');
        await titleInput.setValue('Frontend Developer');

        expect(store.cvData.header.name).toBe('Jane Doe');
        expect(store.cvData.header.title).toBe('Frontend Developer');

        const emailInput = wrapper.find('input[data-testid="email-text-field"]');
        await emailInput.setValue('jane@example.com');
        expect(store.cvData.header.email).toBe('jane@example.com');

        const summary = wrapper.find('[data-testid="summary-text-field"]');
        await summary.setValue('A summary about Jane.');
        expect(store.cvData.summary).toBe('A summary about Jane.');

    });

    it('strips url protocols from linkedin on blur', async () => {
        const linkedinInput = wrapper.find('input[data-testid="linkedin-text-field"]');
        await linkedinInput.setValue('linkedin.com/in/janedoe');
        expect(store.cvData.header.linkedin).toBe('linkedin.com/in/janedoe');
        await linkedinInput.setValue('javascript:alert(1)');
        await linkedinInput.trigger('blur');
        expect(store.cvData.header.linkedin).toBe('alert(1)');
    });
});