import type {CvThemes} from "./themes/themeTypes.ts";

export interface CvSkillType {
    category: string;
    items: string;
}

export interface CvExperienceType {
    id: string;
    title: string;
    company: string;
    startDate?: string;
    endDate?: string;
    bullets: string[];
}

export interface CvEducationType {
    id: string;
    title: string;
    school: string;
    startDate?: string;
    endDate?: string;
    description: string;
}

export interface CvHeaderType {
    name: string;
    title: string;
    phone?: string;
    email?: string;
    location?: string;
    github?: string;
    linkedin?: string;
}

export interface CvDataType {
    selectedFont: string;
    selectedColor: string;
    selectedTheme: CvThemes;
    header: CvHeaderType;
    summary: string;
    skills: CvSkillType[];
    experience: CvExperienceType[];
    education: CvEducationType[];
}