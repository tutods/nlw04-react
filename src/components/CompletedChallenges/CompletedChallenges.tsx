import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './CompletedChallenges.module.sass';

const CompletedChallenges = ({ children }) => {
	const { challengesCompleted } = useContext(ChallengesContext);

	return (
		<div className={styles['completed-container']}>
			<span>Desafios Completos</span>
			<span>{challengesCompleted}</span>
		</div>
	);
};

export { CompletedChallenges };
