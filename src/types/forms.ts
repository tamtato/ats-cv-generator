export type FormId = 'basicInfo' | 'education' | 'experience' | 'skills' | 'theme';

export interface FormConfig {
    id: FormId;
    label: string;
    icon: string;
}

export const FORMS: Record<FormId, FormConfig> = {
    basicInfo: { id: 'basicInfo', label: 'Basic Info', icon: 'material-symbols-light:person-play-outline' },
    education: { id: 'education', label: 'Education', icon: 'material-symbols-light:sports-martial-arts' },
    experience: { id: 'experience', label: 'Experience', icon: 'material-symbols-light:surfing' },
    skills: { id: 'skills', label: 'Skills', icon: 'material-symbols-light:skateboarding' },
    theme: { id: 'theme', label: 'Theme Settings', icon: 'material-symbols-light:palette-outline' },
};
/*
  certificates: {id: 'certificates', label: 'Certificates', icon:'material-symbols-light:scuba-diving'}
*/

export const DRAGGABLE_SECTIONS: Record<string, FormConfig> = {
    education: FORMS.education,
    experience: FORMS.experience,
    skills: FORMS.skills,
};