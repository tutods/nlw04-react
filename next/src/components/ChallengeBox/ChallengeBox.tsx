import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './ChallengeBox.module.sass';

export function ChallengeBox() {
	const { currentChallenge, resetChallenge } = useContext(ChallengesContext);

	const hasCompleteChallenge = () => {
		resetChallenge();
	};

	return (
		<div className={styles['challenge-container']}>
			{currentChallenge ? (
				<div className={styles['challenge-active']}>
					<header>Ganhe {currentChallenge.amount} xp</header>

					<main>
						<img src={`icons/${currentChallenge.type}.svg`} alt='Challenge' />

						<strong>Novo desafio</strong>
						<p>{currentChallenge.description}</p>
					</main>

					<footer>
						<button
							type='button'
							onClick={resetChallenge}
							className={styles['failed-btn']}
						>
							Falhei
						</button>
						<button
							onClick={hasCompleteChallenge}
							type='button'
							className={styles['succeeded-btn']}
						>
							Completei
						</button>
					</footer>
				</div>
			) : (
				<div className={styles['challenge-not-active']}>
					<strong>Finalize um ciclo para receber um desafio</strong>
					<p>
						<img src='icons/level-up.svg' alt='Level Up' />
						Avance de level completando desafios.
					</p>
				</div>
			)}
		</div>
	);
}
