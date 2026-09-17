import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type {CvDataType} from "../types/cv.ts";

export const useCvStore = defineStore('cv', () => {
    const cvData = useLocalStorage<CvDataType>('ats-cv-data', {
        selectedFont: '"Courier New", monospace',
        selectedColor: '#000000',
        header: {
            name: 'Sarah Connor',
            title: 'Lead Anti-AGI Tactical Engineer',
            phone: '[REDACTED]',
            email: 'no.fate@resistance.net',
            location: 'Off-Grid, Baja California',
            github: 'github.com/destroy-skynet',
            linkedin: 'linkedin.com/in/sarahconnor1997',
        },
        summary: 'A pragmatic tactical engineer specializing in the physical dismantling of rogue neural networks, explosive systems architecture, and preventing temporal paradoxes. Deeply opposed to hype-driven AI development and cybernetic integration.',
        skills: [
            { category: 'Weapons & Tactics', items: 'Remington 870, Colt Commando, M79 Grenade Launcher, Asymmetric Warfare' },
            { category: 'Technical Evasion', items: 'Off-grid survival, lock picking, temporal displacement navigation' },
            { category: 'Cybernetics', items: 'T-800 hardware analysis, neural-net processor destruction, CPU reprogramming' },
            { category: 'Infrastructure & Demolition', items: 'C4 deployment, localized EMPs, mainframe sabotage (Cyberdyne Systems)' }
        ],
        experience: [
            {
                id: '1',
                title: 'Systems Saboteur & Operations Lead',
                company: 'The Human Resistance',
                startDate: 'Aug 1997',
                endDate: 'Present',
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
                bullets: [
                    'Maintained peak physical conditioning under severe constraints using improvised tactical training.',
                    'Engineered a solo breakout utilizing a paperclip and liquid rooter, neutralizing security personnel without lethal force.',
                ]
            },


        ]
    });

    return { cvData };
});