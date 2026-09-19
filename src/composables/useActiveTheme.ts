import { computed } from 'vue';
import { useCvStore } from '../stores/cvStore';
import { themeDefinitions } from '../utils/themeDefinitions';

export function useActiveTheme() {
    const store = useCvStore();
    // Returns the object of Tailwind strings for the currently selected theme
    return computed(() => themeDefinitions[store.cvData.selectedTheme]);
}