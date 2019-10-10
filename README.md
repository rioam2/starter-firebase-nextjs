# @template/starter-firebase-nextjs

Forked from [@jthegedus/firebase-gcp-examples](https://github.com/jthegedus/firebase-gcp-examples/tree/master/functions-nextjs) and adapted for personal taste.

## Quickstart

To use this template, click ["Use Template"](https://github.com/rioam2/starter-firebase-nextjs/generate) at the top of the page. This will guide you through generating a new repository with this as a base. Next, head over to [Firebase](https://console.firebase.google.com) and create a new project to host your site. Take note of the project id. Finally, clone your newly generated repository and run these commands (as applicable) from the project root:

```shell
yarn setup                  # setup environment variables and CI/CD
yarn dev                    # start live dev server
yarn preview:staging        # staging preview
yarn preview:production     # production preview
yarn deploy:staging         # publish to staging Firebase project
yarn deploy:production      # publish to production Firebase project
```

# Manual Environment Setup:

If you are unable to use the automated setup script, you can still manually create the following `.env` file to setup your project:

```js
// .env
STATIC_PROD_PROJECT=...     // production Firebase project-id
STATIC_PROD_WEBAPP_KEY=...  // from firebase console
STATIC_STAGE_PROJECT=...    // (optional) staging Firebase project-id
STATIC_STAGE_WEBAPP_KEY=... // (optional) from firebase console
STATIC_DEPLOY_KEY=...       // from yarn firebase login:ci
```

For CI/CD with TravisCI, you will need to do the following:

1. Authorize TravisCI and enable on repository (if applicable).
2. Add environment variables in your repository settings on TravisCI for the each of the variables in your `.env` file.

# Syncing upstream changes from this template

If you would like to keep your template instance up-to-date with this source repository, you can do the following to select and apply updates:

```shell
yarn update
```

This will allow you to apply all necessary, tested, non-breaking patches and changes.
