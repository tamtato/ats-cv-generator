import { computed } from 'vue';
import { useCvStore } from '../stores/cvStore';
import { themeDefinitions } from '../types/themes/themeDefinitions.ts';
import {defaultTheme} from "../types/themes/default.ts";

export function useActiveTheme() {
    const store = useCvStore();
    return computed(() => ({
        ...defaultTheme,
        ...themeDefinitions[store.cvData.selectedTheme]
    }));
}