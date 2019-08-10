const dotenv = require('dotenv').config();
const { exec } = require('child_process');

const mergedEnv = { ...process.env, ...dotenv.parsed };

const command = process.argv
    .slice(2)
    .join(' ')
    .replace(/\%\S+/g, (match) => `"${mergedEnv[match.slice(1)] || ''}"`);

const child = exec(command, { env: mergedEnv });
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
