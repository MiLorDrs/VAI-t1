import { CategoryChip } from '@/components/CategoryChip';
import { formatActivityDate } from '@/data/selectors';
import type { Activity } from '@/data/types';
import styles from './ExpandedActivities.module.scss';

export const ExpandedActivities = ({ activities }: { activities: readonly Activity[] }) => (
    <div className={styles.wrap}>
        <h3 className={styles.title}>RECENT ACTIVITY</h3>
        <div className={styles.tableScroll}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ACTIVITY</th>
                        <th>CATEGORY</th>
                        <th>DATE</th>
                        <th className={styles.pointsCell}>POINTS</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(a => (
                        <tr key={a.id}>
                            <td className={styles.activityName}>{a.name}</td>
                            <td>
                                <CategoryChip category={a.category} />
                            </td>
                            <td className={styles.dateCell}>{formatActivityDate(a.date)}</td>
                            <td className={styles.pointsCell}>+{a.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

