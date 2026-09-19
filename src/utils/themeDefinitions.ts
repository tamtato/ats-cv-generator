import { CvThemes } from "../types/themes.ts";

export const themeDefinitions = {
    [CvThemes.BASIC]: {
        headerName: 'text-3xl font-bold text-gray-900',
        // FIX: Changed cv-selected-color to text-selected-color
        headerTitle: 'text-lg font-medium text-selected-color',
        sectionTitle: 'text-xl font-semibold text-gray-900 border-b-2 border-selected-color pb-1 mb-3',
    },
    [CvThemes.THEME_TWO]: {
        // FIX: Changed cv-selected-color to text-selected-color
        headerName: 'text-4xl font-light text-selected-color uppercase tracking-wide',
        headerTitle: 'text-md font-bold text-gray-600 tracking-wide mt-1',
        // FIX: Changed cv-selected-color to text-selected-color
        sectionTitle: 'text-sm font-bold text-selected-color bg-selected-color/10 px-3 py-1 mb-4 uppercase tracking-wide',
    },
};