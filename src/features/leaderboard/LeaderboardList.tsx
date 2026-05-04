import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import { useFilteredEmployees } from '@/hooks/useFilteredEmployees';
import { LeaderboardRow } from './LeaderboardRow';
import styles from './LeaderboardList.module.scss';

export const LeaderboardList = () => {
    const employees = useFilteredEmployees();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        if (expandedId && !employees.some(e => e.id === expandedId)) {
            setExpandedId(null);
        }
    }, [employees, expandedId]);

    if (employees.length === 0) {
        return (
            <div className={styles.empty}>
                <InfoOutlinedIcon className={styles.emptyIcon} />
                <span>No activities found matching the current filters.</span>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {employees.map((emp, idx) => (
                <LeaderboardRow
                    key={emp.id}
                    employee={emp}
                    rank={idx + 1}
                    isExpanded={expandedId === emp.id}
                    onToggle={() => setExpandedId(prev => (prev === emp.id ? null : emp.id))}
                />
            ))}
        </div>
    );
};

