import {defineStore} from 'pinia';
import {useLocalStorage} from '@vueuse/core';
import type {CvDataType} from "../types/cv.ts";
import {CvThemes} from "../types/themes/themeTypes.ts";
import {ref} from "vue";

export const useCvStore = defineStore('cv', () => {
    const activeCvConfigId = ref('basicInfo');
    const mobileOverlay = ref<'none' | 'cvConfig' | 'preview'>('none');
    const openCvConfigById = (cvConfigId: string) => {
        activeCvConfigId.value = cvConfigId;
        mobileOverlay.value = 'cvConfig';
    };

    const cvData = useLocalStorage<CvDataType>('l2r-cv-data', {
        theme: {
            selectedHeaderFont: 'Arial, sans-serif',
            selectedBodyFont: 'Arial, sans-serif',
            selectedColor: '#b30909',
            selectedTheme: CvThemes.DEFAULT,
        },
        sectionOrder: ['education', 'experience', 'skills', 'certificates'],
        header: {
            name: 'Sarah Connor',
            title: 'Lead Anti-AGI Tactical Engineer',
            phone: '[REDACTED]',
            email: 'no.fate@resistance.net',
            location: 'Off-Grid, Baja California',
            linkedin: 'linkedin.com/in/sarahconnor1997',
            additionalLinks: ['github.com/destroy-skynet']
        },
        summary: 'A pragmatic tactical engineer specializing in the physical dismantling of rogue neural networks, explosive systems architecture, and preventing temporal paradoxes. Deeply opposed to hype-driven AI development and cybernetic integration.',
        skills: [
            {
                category: 'Weapons & Tactics',
                items: 'Remington 870, Colt Commando, M79 Grenade Launcher, Asymmetric Warfare'
            },
            {category: 'Technical Evasion', items: 'Off-grid survival, lock picking, temporal displacement navigation'},
            {
                category: 'Cybernetics',
                items: 'T-800 hardware analysis, neural-net processor destruction, CPU reprogramming'
            },
            {
                category: 'Infrastructure & Demolition',
                items: 'C4 deployment, localized EMPs, mainframe sabotage (Cyberdyne Systems)'
            }
        ],
        experience: [
            {
                id: '1',
                title: 'Systems Saboteur & Operations Lead',
                company: 'The Human Resistance',
                startDate: '1997',
                endDate: '',
                current: true,
                bullets: [
                    'Architected the physical destruction of the Cyberdyne Systems primary development lab, preventing the deployment of the Skynet system.',
                    'Mentored future resistance leadership in tactical survival and guerrilla warfare.',
                    'Successfully evaded advanced cybernetic infiltration units across multiple timelines.'
                ]
            },
            {
                id: '2',
                title: 'Involuntary Inpatient (Maximum Security)',
                company: 'Pescadero State Hospital',
                startDate: '1994',
                endDate: '1995',
                current: false,
                bullets: [
                    'Maintained peak physical conditioning under severe constraints using improvised tactical training.',
                    'Engineered a solo breakout utilizing a paperclip and liquid rooter, neutralizing security personnel without lethal force.',
                ]
            },
        ],
        education: [
            {
                id: '1',
                title: 'Advanced Tactical Engineering',
                school: 'Resistance Training Academy',
                startDate: '1995',
                endDate: '1997',
                current: false,
                description: 'Completed an intensive program focused on guerrilla tactics, cybernetic countermeasures, and temporal anomaly navigation.'
            },
        ],
        certificates: [
            {
                id: '1',
                title: 'Advanced Tactical Engineering',
                grade: 'Pass',
                date: '1997',
                description: 'Completed an intensive program focused on guerrilla tactics, cybernetic countermeasures, and temporal anomaly navigation.'
            },
        ]
    });

    return {
        cvData,
        activeCvConfigId,
        mobileOverlay,
        openCvConfigById
    };
});