import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material';
import { ActivityIconGroup } from '@/components/ActivityIconGroup';
import clsx from '@/components/clsx';
import type { EnrichedEmployee } from '@/data/selectors';
import { ExpandedActivities } from './ExpandedActivities';
import styles from './LeaderboardList.module.scss';

export interface LeaderboardRowProps {
    employee: EnrichedEmployee;
    rank: number;
    isExpanded: boolean;
    onToggle: () => void;
}

export const LeaderboardRow = ({ employee, rank, isExpanded, onToggle }: LeaderboardRowProps) => (
    <div className={clsx(styles.card, isExpanded && styles.expanded)}>
        <div className={styles.row}>
            <div className={styles.rank}>{rank}</div>
            <img src={employee.avatarUrl} alt={employee.name} className={styles.avatar} />
            <div className={styles.identity}>
                <span className={styles.name}>{employee.name}</span>
                <span className={styles.role}>{employee.role}</span>
                <span className={styles.dept}>{employee.departmentCode}</span>
            </div>
            <div className={styles.right}>
                <ActivityIconGroup activities={employee.filteredActivities} />
                <span className={styles.divider} />
                <div className={styles.totalWrap}>
                    <span className={styles.totalLabel}>TOTAL</span>
                    <span className={styles.totalValue}>
                        <StarIcon className={styles.star} />
                        {employee.filteredTotal}
                    </span>
                </div>
                <IconButton
                    size="small"
                    onClick={onToggle}
                    className={styles.expandBtn}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
        </div>
        {isExpanded && <ExpandedActivities activities={employee.filteredActivities} />}
    </div>
);

