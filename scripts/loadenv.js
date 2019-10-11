#! /usr/bin/env node

/**
 * Loads and injects environment variables defined in the project root's .env
 * file for the command provided. If you'd like to use the environment variables
 * as part of command without your shell expanding them first, use a % instead of
 * a $. If you're using the variables within a script, then sticking with $ should
 * be fine.
 *
 * Your system's globally-set environment variables will take priority over those
 * defined in .env as to not break intended system configurations.
 *
 * Ex: loadenv.js echo %MY_PROJECT_ENV
 */

const dotenv = require('dotenv').config();
const { exec } = require('child_process');

const mergedEnv = { ...dotenv.parsed, ...process.env };
const command = process.argv
	.slice(2)
	.map((arg) => (arg.includes(' ') && `'${arg}'`) || arg)
	.join(' ')
	.replace(/\%\S+/g, (match) => `"${mergedEnv[match.slice(1)] || ''}"`);

const child = exec(command, { env: mergedEnv });
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

child.addListener('exit', (code) => {
	process.exitCode = code;
});
