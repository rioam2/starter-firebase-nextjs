import firebase from 'firebase/app';

const projectId = 'nextjs-on-firebase-ts';
const apiKey = 'AIzaSyCsiDksZmYnliMhMVlaZc0AMi-k0JIixSk';

const app =
    firebase.apps[0] ||
    firebase.initializeApp({
        apiKey,
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: `https://${projectId}.firebaseio.com`,
        projectId
    });

export default app;
