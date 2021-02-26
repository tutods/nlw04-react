import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './ExperienceBar.module.sass';

const ExperienceBar = () => {
	const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

	const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

	return (
		<header className={styles['experience-bar']}>
			<span>0 xp</span>

			<div>
				<div style={{ width: `${percentToNextLevel}%` }} />
				<span className={styles['current-xp']} style={{ left: `${percentToNextLevel}%` }}>
					{currentExperience} xp
				</span>
			</div>

			<span>{experienceToNextLevel} xp</span>
		</header>
	);
};

export { ExperienceBar };