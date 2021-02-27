import { IChallenge } from './IChallenge';

export interface IChallengesContextData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	currentChallenge: IChallenge;
	experienceToNextLevel: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenge: () => void;
	completeChallenge: () => void;
}
