import { computed } from 'vue';
import { useCvStore } from '../stores/cvStore';
import { themeDefinitions } from '../utils/themeDefinitions';
import {defaultTheme} from "../utils/default.ts";

export function useActiveTheme() {
    const store = useCvStore();
    return computed(() => ({
        ...defaultTheme,
        ...themeDefinitions[store.cvData.selectedTheme]
    }));
}