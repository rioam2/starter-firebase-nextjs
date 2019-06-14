import Link from 'next/link';
import { NextFunctionComponent } from 'next';

const Header: NextFunctionComponent<Props> = () => (
    <header>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/about">
            <a>About</a>
        </Link>
    </header>
);

interface Props {}

export default Header;
