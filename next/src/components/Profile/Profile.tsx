import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './Profile.module.sass';

const Profile = () => {
	const { level } = useContext(ChallengesContext);

	return (
		<div className={styles['profile-container']}>
			<img src='https://github.com/tutods.png' alt='Daniel Sousa' />

			<div>
				<strong>Daniel Sousa</strong>
				<p>
					<img src='icons/level.svg' alt='Level' />
					Level {level}
				</p>
			</div>
		</div>
	);
};

export { Profile };