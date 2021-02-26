import { createContext, ReactNode, useEffect, useState } from 'react';
import { IChallengesContextData } from '../interfaces/IChallengesContextData';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

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

	/**
	 * To set cookies when have changes in level or current experience or challengesCompleted
	 */
	useEffect(() => {
		Cookies.set('level', String(level));
		Cookies.set('currentExperience', String(currentExperience));
		Cookies.set('challengesCompleted', String(challengesCompleted));
	}, [level, currentExperience, challengesCompleted]);

	/**
	 * Function to play sound when launch new notification
	 */
	function playNotificationSound() {
		const sound = new Audio('/notification.mp3');
		sound.play()
			.then(() => {
			})
			.catch(error => console.log(error));
	}

	const startNewChallenge = () => {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];

		setCurrentChallenge(challenge);

		// Use function to play sound
		playNotificationSound();

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
