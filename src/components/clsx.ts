/** Minimal classnames helper. */
const clsx = (...parts: Array<string | false | null | undefined>): string =>
    parts.filter(Boolean).join(' ');

export default clsx;

