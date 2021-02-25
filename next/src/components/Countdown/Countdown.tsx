import styles from './Countdown.module.sass';
import { useContext, useState } from 'react';
import { CountdownContext } from '../../contexts/CountdownContext';


export function Countdown() {

	const {
		minutes,
		seconds,
		isActive,
		hasFinished,
		resetCountdown,
		startCountdown
	} = useContext(CountdownContext);

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

	const [clockClass, setClockClass] = useState('');

	// useEffect(() => {
	// 	if (hasFinished) {
	// 		// Set clock color green when time is zero
	// 		setClockClass('green-clock');
	// 	} else {
	// 		setClockClass('');
	// 	}
	// }, [hasFinished]);

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
