import { NextComponentType } from 'next';
import Link from 'next/link';
import { withRouter } from 'next/router';

import { AppViewStyles } from './AppView.styles';

export const AppView: NextComponentType = withRouter(({ children }) => {
	return (
		<AppViewStyles.wrapper>
			<h1>Example Application</h1>
			<AppViewStyles.navbar>
				<ul>
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/about">
						<a>About</a>
					</Link>
					<Link href="/dne">
						<a>Error</a>
					</Link>
				</ul>
			</AppViewStyles.navbar>
			<AppViewStyles.spacer />
			{children}
		</AppViewStyles.wrapper>
	);
});
