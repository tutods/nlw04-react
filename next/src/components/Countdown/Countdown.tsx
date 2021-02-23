import { useEffect, useState } from 'react';
import styles from './Countdown.module.sass';

export function Countdown() {
	const [time, setTime] = useState(1 * 60);
	const [active, setActive] = useState(false);

	const [clockClass, setClockClass] = useState('');

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

	const startCountdown = () => {
		setActive(true);
	};

	useEffect(() => {
		if (active && time > 0) {
			setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		}

		console.log(time);

		// Set clock color red when time is zero
		if (time == 0) {
			setClockClass('red-clock');
		}
	}, [active, time]);

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

			<button type='button' onClick={startCountdown} className={styles['start-btn']}>
				Iniciar um ciclo
			</button>
		</div>
	);
}
