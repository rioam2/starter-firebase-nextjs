#!/usr/bin/env bash
unset HISTFILE
pushd "$(dirname $0)" &>/dev/null
cd ..

yarn install

touch .env
grep 'DOTENV_FIREBASE_PROJECT' .env &>/dev/null
if [ $? -eq 0 ]; then read -p "Replace existing Project ID? [Y/n]: " CONF; fi
if [[ $CONF != 'n' ]]; then
    read -p "Firebase Project ID: " PROJECT_ID
    echo "Setting DOTENV_FIREBASE_PROJECT in $(pwd)/.env..."
    echo "$(grep -v 'DOTENV_FIREBASE_PROJECT' .env)" > .env
    echo "DOTENV_FIREBASE_PROJECT=${PROJECT_ID}" >> .env
fi

grep 'DOTENV_FIREBASE_WEB_KEY' .env &>/dev/null
if [ $? -eq 0 ]; then read -p "Replace existing Web API Key? [Y/n]: " CONF; fi
if [[ $CONF != 'n' ]]; then
    read -p "Web API Key from https://console.firebase.google.com/project/${PROJECT_ID}/settings/general/: " WEB_KEY
    echo "Setting DOTENV_FIREBASE_WEB_KEY in $(pwd)/.env..."
    echo "$(grep -v 'DOTENV_FIREBASE_WEB_KEY' .env)" > .env
    echo "DOTENV_FIREBASE_WEB_KEY=${WEB_KEY}" >> .env
fi

grep 'DOTENV_FIREBASE_TOKEN' .env &>/dev/null
if [ $? -eq 0 ]; then read -p "Replace existing Firebase deploy token? [Y/n]: " CONF; fi
if [[ $CONF != 'n' ]]; then
    DEPLOY_TOKEN="1/$(yarn firebase login:ci | grep '1/' | cut -d'/' -f'2' | cut -c 1-43)"
    echo "Setting DOTENV_FIREBASE_TOKEN in $(pwd)/.env..."
    echo "$(grep -v 'DOTENV_FIREBASE_TOKEN' .env)" > .env
    echo "DOTENV_FIREBASE_TOKEN=${DEPLOY_TOKEN}" >> .env
fi

read -p "Would you like to enable CI/CD? [Y/n]: " CONF
if [[ $CONF != 'n' ]]; then 
    grep 'secure' .travis.yml &>/dev/null
    if [ $? -eq 0 ]; then read -p "Repace existing CI/CD environment variables? [Y/n]: " CONF; fi
    if [[ $CONF != 'n' ]]; then
        gem help &>/dev/null
        GEM_NOT_INSTALLED=$?
        if [ $GEM_NOT_INSTALLED -ne 0 ]; then
            echo "rvm/gem is not installed, installing from https://get.rvm.io..."
            curl -sSL https://rvm.io/mpapis.asc | gpg2 --import -
            curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import -
            curl -sSL https://get.rvm.io | bash -s stable --ruby
            if [ $? -ne 0 ]; then exit 1; fi
            source ~/.rvm/scripts/rvm
        fi
        travis help &>/dev/null
        TRAVIS_NOT_INSTALLED=$?
        if [ $TRAVIS_NOT_INSTALLED -ne 0 ]; then
            echo "Travis CLI is not installed, installing using gem..."
            gem install travis
            if [ $? -ne 0 ]; then exit 1; fi
        fi

        REPO_NAME="$(git config --get remote.origin.url | grep -oP '(?<=:)\S+(?=\.git)')"
        echo "Setting encryped environment variables in .travis.yml for repo $REPO_NAME"

        echo "$(grep -v 'secure: ' .travis.yml)" > .travis.yml
        yarn dotenv \
            travis encrypt DOTENV_FIREBASE_PROJECT=%DOTENV_FIREBASE_PROJECT --add env.global -r $REPO_NAME
        yarn dotenv \
            travis encrypt DOTENV_FIREBASE_WEB_KEY=%DOTENV_FIREBASE_WEB_KEY --add env.global -r $REPO_NAME
        yarn dotenv \
            travis encrypt DOTENV_FIREBASE_TOKEN=%DOTENV_FIREBASE_TOKEN --add env.global -r $REPO_NAME

        # Restore prior system state
        if [ $TRAVIS_NOT_INSTALLED -ne 0 ]; then
            echo "Done with travis, uninstalling using gem..."
            echo | gem uninstall travis
        fi
        if [ $GEM_NOT_INSTALLED -ne 0 ]; then
            echo "Done with rvm/gem, uninstalling..."
            echo "yes" | rvm implode
        fi
    fi
fi
