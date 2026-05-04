import { CATEGORY_LABEL, type Category } from '@/data/types';
import styles from './CategoryChip.module.scss';

export const CategoryChip = ({ category }: { category: Category }) => (
    <span className={styles.chip}>{CATEGORY_LABEL[category]}</span>
);

