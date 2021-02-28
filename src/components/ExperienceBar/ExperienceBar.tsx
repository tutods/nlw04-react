import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './ExperienceBar.module.sass';

const ExperienceBar = () => {
	const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
	const [percentToNextLevel, setPercentToNextLevel] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setPercentToNextLevel(Math.round(currentExperience * 100) / experienceToNextLevel);
		}, 100);
	}, [percentToNextLevel, currentExperience]);

	return (
		<header className={styles['experience-bar']}>
			<span>0 xp</span>

			<div>
				<div style={{ width: `${percentToNextLevel || 0}%` }} />
				<span className={styles['current-xp']} style={{ left: `${percentToNextLevel}%` }}>
					{currentExperience} xp
				</span>
			</div>

			<span>{experienceToNextLevel} xp</span>
		</header>
	);
};

export { ExperienceBar };
