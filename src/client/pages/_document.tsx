import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 * Define all site SEO here
 */
export const NEXT_SEO = {
	author: '',
	description: '',
	keywords: '',
	title: ''
};

/**
 * NOTICE: This component is for special SSR configurations only.
 * RootPage will always be rendered server-side, not client-side.
 * Do not add application logic to this component, instead use the _app.tsx file.
 * @see https://nextjs.org/docs/#custom-document
 */
export default class DocumentConfiguration extends Document {
	/**
	 * Used to load styled-components server as described here:
	 * @see https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c
	 */
	static getInitialProps({ renderPage }: any) {
		const sheet = new ServerStyleSheet();
		const page = renderPage((App: any) => (props: any) => sheet.collectStyles(<App {...props} />));
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	render() {
		return (
			<html>
				<Head>
					{Object.entries(NEXT_SEO).map(([name, content]) => content && <meta name={name} content={content} key={name} />)}
					{/* Insert Styled Components Tag(s) */}
					{(this.props as any).styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
