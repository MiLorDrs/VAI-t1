import { useMemo } from 'react';
import { generateEmployees } from '@/data/generateEmployees';
import {
    sortActivitiesByDateDesc,
    sortEmployeesByTotalDesc,
    sumPoints,
    type EnrichedEmployee,
} from '@/data/selectors';
import type { CategoryFilter, QuarterFilter, YearFilter } from '@/data/types';
import { useFilters } from '@/features/filters/FiltersContext';

const ALL_EMPLOYEES = generateEmployees(100, 1337);

const matchYear = (year: YearFilter, isoDate: string) =>
    year === 'all' ? true : isoDate.startsWith(`${year}-`);

const matchQuarter = (q: QuarterFilter, isoDate: string) => {
    if (q === 'all') return true;
    const month = Number(isoDate.slice(5, 7));
    const quarter = Math.ceil(month / 3);
    return quarter === q;
};

const matchCategory = (c: CategoryFilter, value: string) => (c === 'all' ? true : value === c);

export const useFilteredEmployees = (): EnrichedEmployee[] => {
    const { year, quarter, category, search } = useFilters();
    const normalizedSearch = search.trim().toLowerCase();

    return useMemo(() => {
        const enriched: EnrichedEmployee[] = ALL_EMPLOYEES.map(emp => {
            const filteredActivities = sortActivitiesByDateDesc(
                emp.activities.filter(
                    a =>
                        matchYear(year, a.date) &&
                        matchQuarter(quarter, a.date) &&
                        matchCategory(category, a.category),
                ),
            );
            return {
                ...emp,
                filteredActivities,
                filteredTotal: sumPoints(filteredActivities),
            };
        })
            .filter(e => e.filteredActivities.length > 0)
            .filter(e => (normalizedSearch ? e.name.toLowerCase().includes(normalizedSearch) : true));

        return sortEmployeesByTotalDesc(enriched);
    }, [year, quarter, category, normalizedSearch]);
};

