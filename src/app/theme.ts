import { createTheme } from '@mui/material/styles';

export const tokens = {
    bg: '#f4f6f8',
    surface: '#ffffff',
    text: '#0f172a',
    textMuted: '#64748b',
    border: '#e2e8f0',
    primary: '#3b82f6',
    primarySoft: '#eaf2ff',
    primaryBorder: '#bfdbfe',
    gold: '#f5c542',
    goldSoft: '#fff4cc',
    silver: '#c8ced6',
    silverSoft: '#eef1f4',
    bronze: '#a86b3d',
} as const;

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: tokens.primary },
        background: { default: tokens.bg, paper: tokens.surface },
        text: { primary: tokens.text, secondary: tokens.textMuted },
        divider: tokens.border,
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily: "'Inter','Roboto',system-ui,-apple-system,'Segoe UI',sans-serif",
        h1: { fontSize: '2rem', fontWeight: 800, lineHeight: 1.15 },
        h2: { fontSize: '1.5rem', fontWeight: 700 },
        body2: { color: tokens.textMuted },
    },
    components: {
        MuiButton: { defaultProps: { disableElevation: true } },
        MuiPaper: {
            styleOverrides: {
                root: { backgroundImage: 'none' },
            },
        },
    },
});

