import firebase from 'firebase/app';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const apiKey = publicRuntimeConfig.firebaseWebappKey;
const projectId = publicRuntimeConfig.firebaseProject;

const app =
	firebase.apps[0] ||
	firebase.initializeApp({
		apiKey,
		authDomain: `${projectId}.firebaseapp.com`,
		databaseURL: `https://${projectId}.firebaseio.com`,
		projectId
	});

export default app;
