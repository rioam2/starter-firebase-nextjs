import Header from './Header';
import { NextFunctionComponent } from 'next';
import { withRouter, SingletonRouter } from 'next/router';

const App: NextFunctionComponent<Props> = ({ children }) => (
    <main>
        <Header />
        {children}
    </main>
);

interface Query {}
interface Props {
    router: SingletonRouter<Query>;
}

export default withRouter(App);
