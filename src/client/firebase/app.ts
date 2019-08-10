import firebase from 'firebase/app';

const projectId = process.env.STATIC_FIREBASE_PROJECT;
const apiKey = process.env.STATIC_FIREBASE_WEB_KEY;

const app =
    firebase.apps[0] ||
    firebase.initializeApp({
        apiKey,
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: `https://${projectId}.firebaseio.com`,
        projectId
    });

export default app;
