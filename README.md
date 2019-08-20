# @template/starter-firebase-nextjs

Forked from [@jthegedus/firebase-gcp-examples](https://github.com/jthegedus/firebase-gcp-examples/tree/master/functions-nextjs) and adapted for personal taste.

## Quickstart

To use this template, click ["Use Template"](https://github.com/rioam2/starter-firebase-nextjs/generate) at the top of the page. This will guide you through generating a new repository with this as a base. Next, head over to [Firebase](https://console.firebase.google.com) and create a new project to host your site. Take note of the project id. Finally, clone your newly generated repository and run these commands (as applicable) from the project root:

```shell
yarn setup       # setup environment variables and CI/CD
yarn dev         # start live dev server
yarn preview     # production preview
yarn deploy      # publish to firebase
```

# Manual Environment Setup:

If you are unable to use the automated setup script, you can still manually create the following `.env` file to setup your project:

```js
// .env
DOTENV_FIREBASE_PROJECT=... // from firebase console
DOTENV_FIREBASE_WEB_KEY=... // from firebase console
DOTENV_FIREBASE_TOKEN=...   // from yarn firebase login:ci
```

For CI/CD with TravisCI, you will need to do the following:

1. Authorize TravisCI and enable on repository (if applicable).
2. Add secret environment variables in your repository settings on TravisCI for:
   1. $DOTENV_FIREBASE_TOKEN (from `yarn firebase login:ci`)
   2. $DOTENV_FIREBASE_PROJECT
