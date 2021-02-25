import '../styles/global.sass';

import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
	return (
		<ChallengesProvider>
			<Component {...pageProps} />
		</ChallengesProvider>
	);
}

export default MyApp;
