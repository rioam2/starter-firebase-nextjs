# @template/firebase-nextjs

Forked from [@jthegedus/firebase-gcp-examples](https://github.com/jthegedus/firebase-gcp-examples/tree/master/functions-nextjs) and adapted for personal taste.

## Quickstart
```shell
yarn install     # install dependencies
yarn setup       # initialize & link firebase
yarn dev         # start live dev server
yarn preview     # production preview
yarn deploy      # publish to firebase
```

## Travis Automatic Deployment
1. Authroize TravisCI and enable on repository (if applicable).
2. Add environment variables for:
   1. $FIREBASE_TOKEN using `yarn firebase login:ci`
   2. $FIREBASE_PROJECT using your project id