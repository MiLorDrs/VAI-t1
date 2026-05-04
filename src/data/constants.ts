import type { Category } from './types';

export const ROLES: readonly string[] = [
    'Senior Software Engineer',
    'Staff Software Engineer',
    'Software Engineer',
    'Engineering Manager',
    'Principal Engineer',
    'Tech Lead',
    'Frontend Engineer',
    'Backend Engineer',
    'DevOps Engineer',
    'QA Engineer',
];

export const FIRST_NAMES: readonly string[] = [
    'Alex', 'Maria', 'John', 'Emily', 'Michael', 'Olivia', 'David', 'Sophia',
    'Daniel', 'Ava', 'James', 'Mia', 'Ethan', 'Isabella', 'Liam', 'Charlotte',
    'Noah', 'Amelia', 'William', 'Harper', 'Lucas', 'Evelyn', 'Henry', 'Abigail',
    'Sebastian', 'Emma', 'Owen', 'Ella', 'Benjamin', 'Grace', 'Logan', 'Chloe',
    'Mason', 'Lily', 'Jack', 'Zoe', 'Leo', 'Hannah', 'Caleb', 'Layla',
];

export const LAST_NAMES: readonly string[] = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
];

export const POINTS_POOL: readonly number[] = [16, 32, 64, 128];

export const ACTIVITY_NAMES: Record<Category, readonly string[]> = {
    Education: [
        'Internal Tech Talk',
        'Online Course Completed',
        'Certification Earned',
        'Workshop Attendance',
        'Knowledge Sharing Session',
        'Book Club Lead',
        'Mentorship Program',
        'Tech Reading Group',
    ],
    UniversityPartnership: [
        'Guest Lecture',
        'Hackathon Mentor',
        'Career Fair Booth',
        'University Workshop',
        'Capstone Advisor',
        'Student Q&A Panel',
        'Curriculum Review',
        'Open Day Speaker',
    ],
    PublicSpeaking: [
        'Conference Talk',
        'Meetup Speaker',
        'Podcast Guest',
        'Webinar Host',
        'Panel Discussion',
        'Lightning Talk',
        'External Workshop',
        'Industry Summit Talk',
    ],
};

