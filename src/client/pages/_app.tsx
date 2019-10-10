import App, { Container, AppInitialProps } from 'next/app';
import { AppView } from '../views/AppView';
import '../index.css';

export default class Application extends App<AppInitialProps> {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<AppView>
					<Component {...pageProps} />
				</AppView>
			</Container>
		);
	}
}
