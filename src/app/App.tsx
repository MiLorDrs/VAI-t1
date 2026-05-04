import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { FilterBar } from '@/features/filters/FilterBar';
import { FiltersProvider } from '@/features/filters/FiltersContext';
import { LeaderboardList } from '@/features/leaderboard/LeaderboardList';
import { Podium } from '@/features/podium/Podium';
import styles from './App.module.scss';
import { theme } from './theme';

export const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FiltersProvider>
            <div className={styles.layout}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Leaderboard</h1>
                    <p className={styles.subtitle}>Top performers based on contributions and activity</p>
                </header>
                <FilterBar />
                <Podium />
                <LeaderboardList />
            </div>
        </FiltersProvider>
    </ThemeProvider>
);

