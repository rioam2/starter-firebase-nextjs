#!/usr/bin/env bash
set -e

if [[ $TRAVIS_SECURE_ENV_VARS  == 'true' ]]; then
    yarn test
    
    if [[ $TRAVIS_BRANCH == 'master' ]] && [[ $TRAVIS_PULL_REQUEST == 'false' ]]; then
        yarn deploy
        wget "https://$DOTENV_FIREBASE_PROJECT.web.app" -O /dev/null
    fi
fi
