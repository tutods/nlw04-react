import styles from './LevelUpModal.module.sass';
import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';

const LevelUpModal = ({ ...props }) => {

	const { level } = useContext(ChallengesContext);

	return (
		<div className={styles['overlay']}>
			<div className={styles['modal']}>
				<header>{level}</header>

				<strong>Parabéns!</strong>
				<p>Subiu de nível.</p>

				<button type='button' {...props} />
			</div>
		</div>
	);
};

export { LevelUpModal };