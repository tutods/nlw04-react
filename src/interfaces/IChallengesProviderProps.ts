import { ReactNode } from 'react';

export interface IChallengesProviderProps {
	children: ReactNode;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}
