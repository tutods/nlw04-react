import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './ChallengeBox.module.sass';
import { CountdownContext } from '../../contexts/CountdownContext';

const ChallengeBox = () => {
	const { completeChallenge, currentChallenge, resetChallenge } = useContext(ChallengesContext);
	const { resetCountdown } = useContext(CountdownContext);

	const handleChallengeSucceeded = () => {
		completeChallenge();
		resetCountdown();
	};

	const handleChallengeFailed = () => {
		resetChallenge();
		resetCountdown();
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
							onClick={handleChallengeFailed}
							className={styles['failed-btn']}
						>
							Falhei
						</button>
						<button
							onClick={handleChallengeSucceeded}
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
};

export { ChallengeBox };
