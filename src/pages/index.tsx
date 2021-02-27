import { CompletedChallenges } from '../components/CompletedChallenges/CompletedChallenges';
import { Countdown } from '../components/Countdown/Countdown';
import { ExperienceBar } from '../components/ExperienceBar/ExperienceBar';
import { ChallengeBox } from '../components/ChallengeBox/ChallengeBox';
import { Profile } from '../components/Profile/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { GetServerSideProps } from 'next';
import { IHomeProps } from '../interfaces/IHomeProps';
import Head from 'next/head';

import styles from './../styles/Home.module.sass';

export default function Home(props: IHomeProps) {
	return (
		<ChallengesProvider
			level={props.level}
			currentExperience={props.currentExperience}
			challengesCompleted={props.challengesCompleted}
		>
			<div className={styles['container']}>
				<Head>
					<title>Home | move.it</title>
				</Head>

				<ExperienceBar />

				<CountdownProvider>
					<section>
						<div>
							<Profile />

							<CompletedChallenges />

							<Countdown />
						</div>

						<div>
							<ChallengeBox />
						</div>
					</section>
				</CountdownProvider>
			</div>
		</ChallengesProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// Get Cookies
	const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted),
		},
	};
};
