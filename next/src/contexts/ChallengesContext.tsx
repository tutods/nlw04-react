import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;
}

interface ChallengesContextData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	currentChallenge: Challenge;
	experienceToNextLevel: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenge: () => void;
}

interface ChallengesProviderProps {
	children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);

	const [currentChallenge, setCurrentChallenge] = useState(null);

	const startNewChallenge = () => {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];

		setCurrentChallenge(challenge);
	};

	const resetChallenge = () => {
		setCurrentChallenge(null);
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
			}}
		>
			{children}
		</ChallengesContext.Provider>
	);
};
