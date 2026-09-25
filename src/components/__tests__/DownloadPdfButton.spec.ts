import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import DownloadPdfButton from '../CvBuilderApp/EditorSidebar/sections/DownloadPdfButton.vue';

describe('DownloadPdfButton.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock the native print function
    window.print = vi.fn();

    wrapper = mount(DownloadPdfButton);
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  it('triggers the browser print dialog when clicked', async () => {
    const printBtn = wrapper.find('[data-testid="download-pdf-button"]');
    await printBtn.trigger('click');

    expect(window.print).toHaveBeenCalledOnce();
  });
});