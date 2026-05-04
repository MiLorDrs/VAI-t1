import { ACTIVITY_NAMES, FIRST_NAMES, LAST_NAMES, POINTS_POOL, ROLES } from './constants';
import { CATEGORIES, type Activity, type Category, type Employee } from './types';

/** Deterministic PRNG (mulberry32). */
const createRng = (seed: number) => {
    let s = seed >>> 0;
    return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

const pick = <T>(rng: () => number, arr: readonly T[]): T => {
    const idx = Math.floor(rng() * arr.length) % arr.length;
    return arr[idx] as T;
};

const randInt = (rng: () => number, min: number, max: number): number =>
    Math.floor(rng() * (max - min + 1)) + min;

const pad2 = (n: number) => n.toString().padStart(2, '0');

const daysInMonth = (year: number, monthIdx: number) => new Date(year, monthIdx + 1, 0).getDate();

const randomDate2025 = (rng: () => number): string => {
    const month = randInt(rng, 0, 11);
    const day = randInt(rng, 1, daysInMonth(2025, month));
    return `2025-${pad2(month + 1)}-${pad2(day)}`;
};

const departmentCode = (rng: () => number): string => {
    const letters = (count: number) =>
        Array.from({ length: count }, () => String.fromCharCode(65 + randInt(rng, 0, 25))).join('');
    const letterDigit = () => `${String.fromCharCode(65 + randInt(rng, 0, 25))}${randInt(rng, 0, 9)}`;
    return `${letters(2)}.${letterDigit()}.${letterDigit()}.${letterDigit()}`;
};

const generateActivities = (rng: () => number, employeeId: string): Activity[] => {
    const count = randInt(rng, 1, 25);
    return Array.from({ length: count }, (_, i) => {
        const category: Category = pick(rng, CATEGORIES);
        const name = pick(rng, ACTIVITY_NAMES[category]);
        const points = pick(rng, POINTS_POOL);
        const date = randomDate2025(rng);
        return {
            id: `${employeeId}-act-${i}`,
            name,
            category,
            date,
            points,
        };
    });
};

export const generateEmployees = (count = 100, seed = 1337): Employee[] => {
    const rng = createRng(seed);
    return Array.from({ length: count }, (_, i) => {
        const id = `emp-${i + 1}`;
        const first = pick(rng, FIRST_NAMES);
        const last = pick(rng, LAST_NAMES);
        const name = `${first} ${last}`;
        const role = pick(rng, ROLES);
        const avatarSeed = randInt(rng, 1, 70);
        const avatarUrl = `https://i.pravatar.cc/150?img=${avatarSeed}`;
        return {
            id,
            name,
            role,
            departmentCode: departmentCode(rng),
            avatarUrl,
            activities: generateActivities(rng, id),
        };
    });
};

