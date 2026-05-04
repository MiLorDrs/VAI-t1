import CoPresentIcon from '@mui/icons-material/CoPresent';
import SchoolIcon from '@mui/icons-material/School';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Tooltip } from '@mui/material';
import { CATEGORIES, CATEGORY_LABEL, type Activity, type Category } from '@/data/types';
import { countByCategory } from '@/data/selectors';
import styles from './ActivityIconGroup.module.scss';

const ICONS: Record<Category, typeof SchoolIcon> = {
    Education: SchoolIcon,
    UniversityPartnership: SentimentSatisfiedAltIcon,
    PublicSpeaking: CoPresentIcon,
};

export interface ActivityIconGroupProps {
    activities: readonly Activity[];
}

export const ActivityIconGroup = ({ activities }: ActivityIconGroupProps) => {
    const items = CATEGORIES.map(cat => ({
        cat,
        count: countByCategory(activities, cat),
    })).filter(i => i.count > 0);

    if (items.length === 0) return null;

    return (
        <span className={styles.group}>
            {items.map(({ cat, count }) => {
                const Icon = ICONS[cat];
                return (
                    <Tooltip key={cat} title={`${CATEGORY_LABEL[cat]}: ${count}`} arrow>
                        <span className={styles.item}>
                            <Icon className={styles.icon} />
                            <span className={styles.count}>{count}</span>
                        </span>
                    </Tooltip>
                );
            })}
        </span>
    );
};

