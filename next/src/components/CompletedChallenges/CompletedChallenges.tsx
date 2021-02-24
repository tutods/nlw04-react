import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './CompletedChallenges.module.sass';

export function CompletedChallenges() {
	const { challengesCompleted } = useContext(ChallengesContext);

	return (
		<div className={styles['completed-container']}>
			<span>Desafios Completos</span>
			<span>{challengesCompleted}</span>
		</div>
	);
}
