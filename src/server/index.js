import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import next from 'next';

admin.initializeApp();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'dist/client' } });
const handle = app.getRequestHandler();

const server = functions.https.onRequest((req, res) => app.prepare().then(() => handle(req, res)));

// Scope server in nextjs cloud-function group
const nextjs = { server };
export { nextjs };
