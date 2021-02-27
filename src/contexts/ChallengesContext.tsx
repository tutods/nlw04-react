import { createContext, useEffect, useState } from 'react';
import { IChallengesContextData } from '../interfaces/IChallengesContextData';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { IChallengesProviderProps } from '../interfaces/IChallengesProviderProps';
import { LevelUpModal } from '../components/LevelUpModal/LevelUpModal';
import { useKey, useKeyPress } from 'react-use';

export const ChallengesContext = createContext({} as IChallengesContextData);

export const ChallengesProvider = ({
	children,
	...props // the remaining props which are not a children
}: IChallengesProviderProps) => {
	const [level, setLevel] = useState(props.level ?? 1);
	const [currentExperience, setCurrentExperience] = useState(props.currentExperience ?? 0);
	const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted ?? 0);

	const [currentChallenge, setCurrentChallenge] = useState(null);

	/**
	 * To set state of modal (open or closed)
	 */
	const [isLevelUpModelOpen, setIsLevelUpModelOpen] = useState(false);

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
	const playNotificationSound = () => {
		const sound = new Audio('/notification.mp3');
		sound
			.play()
			.then(() => {})
			.catch((error) => console.log(error));
	};

	const closeLevelUpModal = () => {
		setIsLevelUpModelOpen(false);
	};

	const startNewChallenge = () => {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];

		setCurrentChallenge(challenge);

		// Use function to play sound
		playNotificationSound();

		if (Notification.permission === 'granted') {
			new Notification('Novo Desafio 🎉', {
				body: `Novo desafio com ${challenge.amount} xp!`,
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
		setIsLevelUpModelOpen(true);
	};

	/**
	 * When user press ESC key close Level Up Modal
	 */
	useKey('Escape', () => {
		setIsLevelUpModelOpen(false);
	});

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
				completeChallenge,
			}}
		>
			{children}

			{isLevelUpModelOpen && <LevelUpModal onClick={closeLevelUpModal} />}
		</ChallengesContext.Provider>
	);
};
