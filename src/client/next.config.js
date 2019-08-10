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
        distDir: '../../dist/client'
    })
);
