#! /bin/bash
pushd "$(dirname $0)" &> /dev/null
cd ..

yarn install

# Generate .env file
echo "Firebase Project ID:"
read; PROJECT_ID="$REPLY"
echo "Web API Key ( https://console.firebase.google.com/u/0/project/${PROJECT_ID} ):"
read; WEB_KEY="$REPLY"
DEPLOY_TOKEN="1/$(yarn firebase login:ci | grep '1/' | cut -d'/' -f'2' | cut -c 1-43)"

echo "DOTENV_FIREBASE_PROJECT=${PROJECT_ID}" >> .env
echo "DOTENV_FIREBASE_WEB_KEY=${WEB_KEY}" >> .env
echo "DOTENV_FIREBASE_TOKEN=${DEPLOY_TOKEN}" >> .env
