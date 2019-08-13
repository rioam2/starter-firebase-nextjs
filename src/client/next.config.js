const withCSS = require('@zeit/next-css');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();
const withNextEnv = nextEnv({
    staticPrefix: 'DOTENV_',
    publicPrefix: 'PUBLIC_'
});

module.exports = withNextEnv(
    withCSS({
        distDir: '../../dist/client'
    })
);
