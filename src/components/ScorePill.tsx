import StarIcon from '@mui/icons-material/Star';
import clsx from './clsx';
import styles from './ScorePill.module.scss';

export interface ScorePillProps {
    value: number;
    variant?: 'default' | 'gold';
}

export const ScorePill = ({ value, variant = 'default' }: ScorePillProps) => (
    <span className={clsx(styles.root, variant === 'gold' && styles.gold)}>
        <StarIcon className={styles.icon} />
        {value}
    </span>
);

