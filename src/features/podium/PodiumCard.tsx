import clsx from '@/components/clsx';
import { ScorePill } from '@/components/ScorePill';
import type { EnrichedEmployee } from '@/data/selectors';
import styles from './Podium.module.scss';

export interface PodiumCardProps {
    employee: EnrichedEmployee;
    rank: 1 | 2 | 3;
}

const RANK_VARIANT: Record<1 | 2 | 3, 'gold' | 'silver' | 'bronze'> = {
    1: 'gold',
    2: 'silver',
    3: 'bronze',
};

export const PodiumCard = ({ employee, rank }: PodiumCardProps) => {
    const variant = RANK_VARIANT[rank];
    const isGold = rank === 1;
    return (
        <div className={styles.card}>
            <div className={clsx(styles.avatarWrap, isGold && styles.large, styles[variant])}>
                <img src={employee.avatarUrl} alt={employee.name} className={styles.avatar} />
                <span className={styles.rankBadge}>{rank}</span>
            </div>
            <div className={styles.name}>{employee.name}</div>
            <div className={styles.role}>
                {employee.role} ({employee.departmentCode})
            </div>
            <ScorePill value={employee.filteredTotal} variant={isGold ? 'gold' : 'default'} />
        </div>
    );
};

