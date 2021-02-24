import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './Countdown.module.sass';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
	const { startNewChallenge } = useContext(ChallengesContext);

	const [time, setTime] = useState(0.1 * 60);
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const [clockClass, setClockClass] = useState('');

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

	const startCountdown = () => {
		setIsActive(true);
	};

	const resetCountdown = () => {
		clearTimeout(countdownTimeout);

		setIsActive(false);

		setTime(0.1 * 60); // reset time to initial value (25 min.)
	};

	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		} else if (isActive && time === 0) {
			// Set clock color gree when time is zero
			setClockClass('green-clock');
			setHasFinished(true);
			setIsActive(false);
			startNewChallenge();
		}
	}, [isActive, time]);

	return (
		<div>
			<div className={`${styles['countdown-container']} ${styles[clockClass]}`}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>

				<span>:</span>

				<div>
					<span>{secondLeft}</span>
					<span>{secondRight}</span>
				</div>
			</div>

			{hasFinished ? (
				<button disabled className={styles['countdown-btn']}>
					Ciclo encerrado
				</button>
			) : isActive ? (
				<button
					type='button'
					onClick={resetCountdown}
					className={`${styles['countdown-btn']} ${styles['btn-active']}`}
				>
					Abandonar ciclo
				</button>
			) : (
				<button
					type='button'
					onClick={startCountdown}
					className={`${styles['countdown-btn']}`}
				>
					Iniciar um ciclo
				</button>
			)}
		</div>
	);
}
