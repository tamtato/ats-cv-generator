import { CvThemes } from "./themeTypes.ts";
import {defaultTheme} from "./default.ts";
import {fancyTheme} from "./fancy.ts";
import {fancierTheme} from "./fancier.ts";
import {fanciestTheme} from "./fanciest.ts";

export const themeDefinitions = {
    [CvThemes.DEFAULT]: defaultTheme,
    [CvThemes.FANCY]: fancyTheme,
    [CvThemes.FANCIER]: fancierTheme,
    [CvThemes.FANCIEST]: fanciestTheme
};