import styles from './Profile.module.sass';

export default function Profile() {
	return (
		<div className={styles['profile-container']}>
			<img src='https://github.com/tutods.png' alt='Daniel Sousa' />

			<div>
				<strong>Daniel Sousa</strong>
				<p>
					<img src='icons/level.svg' alt='Level' />
					Level 1
				</p>
			</div>
		</div>
	);
}
