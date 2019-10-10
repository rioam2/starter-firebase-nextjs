const withCSS = require('@zeit/next-css');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();
const withNextEnv = nextEnv({
	staticPrefix: 'STATIC_',
	publicPrefix: 'PUBLIC_'
});

module.exports = withNextEnv(
	withCSS({
		distDir: '../../dist/client',
		publicRuntimeConfig: {
			firebaseProject:
				process.env.FB_ENV === 'production' ? process.env.STATIC_PROD_PROJECT : process.env.STATIC_STAGE_PROJECT,
			firebaseWebappKey:
				process.env.FB_ENV === 'production' ? process.env.STATIC_PROD_WEBAPP_KEY : process.env.STATIC_STAGE_WEBAPP_KEY
		}
	})
);
