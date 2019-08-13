#! /bin/bash

yarn dotenv \
    cross-env NODE_ENV=production \
        yarn firebase serve \
            --only functions,hosting \
            --port=3000 \
            --project %DOTENV_FIREBASE_PROJECT
