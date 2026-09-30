export type CvConfigId = 'basicInfo' | 'education' | 'experience' | 'skills' | 'theme';

export interface CvConfigType {
    id: CvConfigId;
    label: string;
    icon: string;
}

export const CV_CONFIGS: Record<CvConfigId, CvConfigType> = {
    basicInfo: { id: 'basicInfo', label: 'Basic Info & Summary', icon: 'material-symbols-light:person-play-outline' },
    education: { id: 'education', label: 'Education', icon: 'material-symbols-light:sports-martial-arts' },
    experience: { id: 'experience', label: 'Experience', icon: 'material-symbols-light:surfing' },
    skills: { id: 'skills', label: 'Skills', icon: 'material-symbols-light:skateboarding' },
    theme: { id: 'theme', label: 'Theme Settings', icon: 'material-symbols-light:palette-outline' },
};
/*
  certificates: {id: 'certificates', label: 'Certificates', icon:'material-symbols-light:scuba-diving'}
*/

export const DRAGGABLE_SECTIONS: Record<string, CvConfigType> = {
    education: CV_CONFIGS.education,
    experience: CV_CONFIGS.experience,
    skills: CV_CONFIGS.skills,
};