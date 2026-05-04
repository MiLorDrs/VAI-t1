import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CategoryFilter, QuarterFilter, YearFilter } from '@/data/types';

export interface FiltersState {
    year: YearFilter;
    quarter: QuarterFilter;
    category: CategoryFilter;
    search: string;
}

export interface FiltersContextValue extends FiltersState {
    setYear: (v: YearFilter) => void;
    setQuarter: (v: QuarterFilter) => void;
    setCategory: (v: CategoryFilter) => void;
    setSearch: (v: string) => void;
}

const DEFAULT_STATE: FiltersState = {
    year: 'all',
    quarter: 'all',
    category: 'all',
    search: '',
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<FiltersState>(DEFAULT_STATE);

    const value = useMemo<FiltersContextValue>(
        () => ({
            ...state,
            setYear: v => setState(s => ({ ...s, year: v })),
            setQuarter: v => setState(s => ({ ...s, quarter: v })),
            setCategory: v => setState(s => ({ ...s, category: v })),
            setSearch: v => setState(s => ({ ...s, search: v })),
        }),
        [state],
    );

    return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export const useFilters = (): FiltersContextValue => {
    const ctx = useContext(FiltersContext);
    if (!ctx) throw new Error('useFilters must be used within FiltersProvider');
    return ctx;
};

