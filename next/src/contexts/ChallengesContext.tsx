import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { IChallengesContextData } from '../interfaces/IChallengesContextData';

interface ChallengesProviderProps {
	children: ReactNode;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);

	const [currentChallenge, setCurrentChallenge] = useState(null);

	/**
	 * Request notifications permissions to browser
	 */
	useEffect(() => {
		Notification.requestPermission();
	}, []); // Empty array to run only one time


	function soundNotification() {
		const sound = new Audio('/notification.mp3');
		sound.play()
			.then(() => {
			})
			.catch(error => console.error);
	}


	const startNewChallenge = () => {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];

		setCurrentChallenge(challenge);

		// const notificationSound = new Audio('/notification.mp3');
		// notificationSound.play();

		soundNotification();

		if (Notification.permission === 'granted') {
			new Notification('Novo Desafio 🎉', {
				body: `Novo desafio com ${challenge.amount} xp!`
			});
		}
	};

	const resetChallenge = () => {
		setCurrentChallenge(null);
	};

	const completeChallenge = () => {
		if (!currentChallenge) {
			return;
		}

		const { amount } = currentChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp();
		}

		setCurrentExperience(finalExperience);
		setCurrentChallenge(null);
		setChallengesCompleted(challengesCompleted + 1);
	};

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2); // Experience factor

	const levelUp = () => {
		setLevel(level + 1);
	};

	return (
		<ChallengesContext.Provider
			value={{
				level,
				currentExperience,
				challengesCompleted,
				currentChallenge,
				experienceToNextLevel,
				levelUp,
				startNewChallenge,
				resetChallenge,
				completeChallenge
			}}
		>
			{children}
		</ChallengesContext.Provider>
	);
};
