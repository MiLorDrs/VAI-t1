import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { CATEGORIES, CATEGORY_LABEL, type CategoryFilter, type QuarterFilter, type YearFilter } from '@/data/types';
import { useFilters } from './FiltersContext';
import styles from './FilterBar.module.scss';

const YEAR_OPTIONS: { value: YearFilter; label: string }[] = [
    { value: 'all', label: 'All Years' },
    { value: '2025', label: '2025' },
];

const QUARTER_OPTIONS: { value: QuarterFilter; label: string }[] = [
    { value: 'all', label: 'All Quarters' },
    { value: 1, label: 'Q1' },
    { value: 2, label: 'Q2' },
    { value: 3, label: 'Q3' },
    { value: 4, label: 'Q4' },
];

export const FilterBar = () => {
    const { year, quarter, category, search, setYear, setQuarter, setCategory, setSearch } = useFilters();

    return (
        <div className={styles.bar}>
            <TextField
                select
                size="small"
                value={year}
                onChange={e => setYear(e.target.value as YearFilter)}
                className={styles.select}
                aria-label="Year filter">
                {YEAR_OPTIONS.map(o => (
                    <MenuItem key={o.value} value={o.value}>
                        {o.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                size="small"
                value={quarter}
                onChange={e => {
                    const v = e.target.value;
                    setQuarter(v === 'all' ? 'all' : (Number(v) as QuarterFilter));
                }}
                className={styles.select}
                aria-label="Quarter filter">
                {QUARTER_OPTIONS.map(o => (
                    <MenuItem key={String(o.value)} value={o.value}>
                        {o.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                size="small"
                value={category}
                onChange={e => setCategory(e.target.value as CategoryFilter)}
                className={styles.select}
                aria-label="Category filter">
                <MenuItem value="all">All Categories</MenuItem>
                {CATEGORIES.map(c => (
                    <MenuItem key={c} value={c}>
                        {CATEGORY_LABEL[c]}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                size="small"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search employee..."
                className={styles.search}
                aria-label="Search employee"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                    endAdornment: search ? (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={() => setSearch('')}
                                aria-label="Clear search"
                                edge="end">
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
            />
        </div>
    );
};

