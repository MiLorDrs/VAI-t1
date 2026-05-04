import clsx from '@/components/clsx';
import { useFilteredEmployees } from '@/hooks/useFilteredEmployees';
import { PodiumCard } from './PodiumCard';
import styles from './Podium.module.scss';

export const Podium = () => {
    const employees = useFilteredEmployees();
    const top3 = employees.slice(0, 3);
    if (top3.length === 0) return null;

    const first = top3[0];
    const second = top3[1];
    const third = top3[2];

    return (
        <div className={styles.podium}>
            <div className={styles.slot}>
                {second && <PodiumCard employee={second} rank={2} />}
                {second && <div className={clsx(styles.pedestal, styles.h2)}>2</div>}
            </div>
            <div className={styles.slot}>
                {first && <PodiumCard employee={first} rank={1} />}
                {first && <div className={clsx(styles.pedestal, styles.gold, styles.h1)}>1</div>}
            </div>
            <div className={styles.slot}>
                {third && <PodiumCard employee={third} rank={3} />}
                {third && <div className={clsx(styles.pedestal, styles.h3)}>3</div>}
            </div>
        </div>
    );
};

