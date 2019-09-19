#!/usr/bin/env bash

set -e

if [[ $TRAVIS_SECURE_ENV_VARS  == 'true' ]]; then
    yarn test
    
    # Continuous Deployment for staging/production
    if [[ $TRAVIS_BRANCH == 'master' ]]; then
        if [[ $TRAVIS_PULL_REQUEST == 'false' ]]; then
            # If tests passed on master and not a PR, deploy to production
            yarn deploy:production
            wget "https://$STATIC_PROD_PROJECT.web.app" -O /dev/null
        else 
            # If tests passed on master for PR, deploy to staging
            yarn deploy:staging
            wget "https://$STATIC_STAGE_PROJECT.web.app" -O /dev/null
        fi
    fi
fi
