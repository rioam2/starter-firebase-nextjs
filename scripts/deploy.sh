#! /bin/bash

yarn dotenv \
    yarn firebase deploy \
        --only functions,hosting,firestore:rules \
        --project %DOTENV_FIREBASE_PROJECT \
        --token %DOTENV_FIREBASE_TOKEN
