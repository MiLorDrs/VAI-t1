export type Category = 'Education' | 'UniversityPartnership' | 'PublicSpeaking';

export const CATEGORIES: readonly Category[] = ['Education', 'UniversityPartnership', 'PublicSpeaking'];

export const CATEGORY_LABEL: Record<Category, string> = {
    Education: 'Education',
    UniversityPartnership: 'University Partnership',
    PublicSpeaking: 'Public Speaking',
};

export interface Activity {
    id: string;
    name: string;
    category: Category;
    /** ISO date string (YYYY-MM-DD) */
    date: string;
    points: number;
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    departmentCode: string;
    avatarUrl: string;
    activities: Activity[];
}

export type YearFilter = 'all' | '2025';
export type QuarterFilter = 'all' | 1 | 2 | 3 | 4;
export type CategoryFilter = 'all' | Category;

