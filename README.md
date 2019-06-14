# @template/starter-firebase-nextjs

Forked from [@jthegedus/firebase-gcp-examples](https://github.com/jthegedus/firebase-gcp-examples/tree/master/functions-nextjs) and adapted for personal taste.

## Quickstart

To use this template, click ["Use Template"](https://github.com/rioam2/starter-firebase-nextjs/generate) at the top of the page. This will guide you through generating a new repository with this as a base. Next, head over to [Firebase](https://console.firebase.google.com) and create a new project to host your site. Take note of the project id. Finally, clone your newly generated repository and run these commands (as applicable) from the project root:

```shell
yarn install     # install dependencies
yarn setup       # initialize & link firebase
yarn dev         # start live dev server
yarn preview     # production preview
yarn deploy      # publish to firebase
```

## Travis Continuous Deployment

Automatically deploy passing builds to your firebase project!

1. Authorize TravisCI and enable on repository (if applicable).
2. Add environment variables for:
   1. $FIREBASE_TOKEN using `yarn firebase login:ci`
   2. $FIREBASE_PROJECT using your project id