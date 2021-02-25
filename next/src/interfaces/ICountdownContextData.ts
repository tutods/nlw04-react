export interface ICountdownContextData {
	minutes: number;
	seconds: number;
	hasFinished: boolean;
	isActive: boolean;
	startCountdown: () => void;
	resetCountdown: () => void;
}
