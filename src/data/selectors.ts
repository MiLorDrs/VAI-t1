import type { Activity, Category, Employee } from './types';

export const getQuarter = (isoDate: string): 1 | 2 | 3 | 4 => {
    const month = Number(isoDate.slice(5, 7));
    return (Math.ceil(month / 3) as 1 | 2 | 3 | 4);
};

export const getYear = (isoDate: string): number => Number(isoDate.slice(0, 4));

export const sumPoints = (activities: readonly Activity[]): number =>
    activities.reduce((acc, a) => acc + a.points, 0);

export const countByCategory = (activities: readonly Activity[], category: Category): number =>
    activities.reduce((acc, a) => acc + (a.category === category ? 1 : 0), 0);

export const sortActivitiesByDateDesc = (activities: readonly Activity[]): Activity[] =>
    [...activities].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const sortEmployeesByTotalDesc = <T extends { filteredTotal: number; name: string }>(
    list: readonly T[],
): T[] =>
    [...list].sort((a, b) => {
        if (b.filteredTotal !== a.filteredTotal) return b.filteredTotal - a.filteredTotal;
        return a.name.localeCompare(b.name);
    });

export const formatActivityDate = (isoDate: string): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [y, m, d] = isoDate.split('-');
    if (!y || !m || !d) return isoDate;
    const monthName = months[Number(m) - 1] ?? m;
    return `${d}-${monthName}-${y}`;
};

export type EnrichedEmployee = Employee & {
    filteredActivities: Activity[];
    filteredTotal: number;
};

