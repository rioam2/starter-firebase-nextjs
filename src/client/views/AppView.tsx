import { NextComponentType } from 'next';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { AppViewStyles } from './AppView.styles';

export const AppView: NextComponentType = withRouter(({ children }) => {
    return (
        <AppViewStyles.wrapper>
            <h1>starter-firebase-nextjs</h1>
            <p>This is your application view (src/client/views/AppView.tsx)</p>
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
            <hr />
            {children}
        </AppViewStyles.wrapper>
    );
});
