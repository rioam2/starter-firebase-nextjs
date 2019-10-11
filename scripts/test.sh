#!/usr/bin/env bash

set -e

yarn test

# Continuous Deployment for staging/production
if [[ $TRAVIS_BRANCH == 'master' ]]; then
    if [[ $TRAVIS_PULL_REQUEST == 'false' ]]; then
        if [[ ! -z $STATIC_PROD_PROJECT ]] && [[ ! -z $STATIC_DEPLOY_KEY ]]; then
            # If tests passed on master and not a PR, deploy to production
            yarn deploy:production
            wget "https://$STATIC_PROD_PROJECT.web.app" -O /dev/null
        fi
    else 
        if [[ ! -z $STATIC_STAGE_PROJECT ]] && [[ ! -z $STATIC_DEPLOY_KEY ]]; then
            # If tests passed on master for PR, deploy to staging
            yarn deploy:staging
            wget "https://$STATIC_STAGE_PROJECT.web.app" -O /dev/null
        fi
    fi
fi
