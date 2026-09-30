import type {CvThemes} from "./themes/themeTypes.ts";

export interface CvSkillType {
    category: string;
    items: string;
}

export interface CvExperienceType {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
}

export interface CvEducationType {
    id: string;
    title: string;
    school: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface CvHeaderType {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    linkedin: string;
    additionalLinks: string[];
}

export interface CvThemeType {
    selectedHeaderFont: string;
    selectedBodyFont: string;
    selectedColor: string;
    selectedTheme: CvThemes;
}

export interface CvDataType {
    theme: CvThemeType;
    sectionOrder: string[];
    header: CvHeaderType;
    summary: string;
    skills: CvSkillType[];
    experience: CvExperienceType[];
    education: CvEducationType[];
}