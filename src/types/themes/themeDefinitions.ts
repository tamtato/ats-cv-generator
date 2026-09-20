import { CvThemes } from "./themeTypes.ts";
import {defaultTheme} from "./default.ts";
import {themeTwo} from "./themeTwo.ts";
import {themeOne} from "./themeOne.ts";
import {themeThree} from "./themeThree.ts";
import {themeFour} from "./themeFour.ts";
import {themeFive} from "./themeFive.ts";
import {themeSix} from "./themeSix.ts";
import {themeSeven} from "./themeSeven.ts";
import {themeEight} from "./themeEight.ts";
import {themeNine} from "./themeNine.ts";
import {themeTen} from "./themeTen.ts";

export const themeDefinitions = {
    [CvThemes.DEFAULT]: defaultTheme,
    [CvThemes.THEME_ONE]: themeOne,
    [CvThemes.THEME_TWO]: themeTwo,
    [CvThemes.THEME_THREE]: themeThree,
    [CvThemes.THEME_FOUR]: themeFour,
    [CvThemes.THEME_FIVE]: themeFive,
    [CvThemes.THEME_SIX]: themeSix,
    [CvThemes.THEME_SEVEN]: themeSeven,
    [CvThemes.THEME_EIGHT]: themeEight,
    [CvThemes.THEME_NINE]: themeNine,
    [CvThemes.THEME_TEN]: themeTen,
};

/*
ATS Safe Font sizes :)

Main Name: 24px – 36px
Professional Title: 16px – 20px
Section Headers (Experience, etc.): 16px – 18px
Item Titles (Job roles, Degrees): 14px – 16px
Text (Summary, Bullets): 12px – 14px
Meta Info (Dates, Locations, Contact): 11px – 12px
*/
