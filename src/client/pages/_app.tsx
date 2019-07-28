import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import { GetInitialProps } from 'next';

type GetInitialAppProps = GetInitialProps<any, NextAppContext>;

export default class Application extends App<DefaultAppIProps> {
    static getInitialProps: GetInitialAppProps = async ({ Component, ctx }) => {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    };

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}
