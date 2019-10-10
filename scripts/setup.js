#! /usr/bin/env node
const {
	authenticate,
	listFirebaseProjects,
	createFirebaseProject,
	listFirebaseProjectApps,
	createFirebaseWebapp,
	getFirebaseWebappConfig
} = require('firebase-project-manager');
const dotenv = require('dotenv');
const inquirer = require('inquirer');
const gitconfig = require('gitconfiglocal');
const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const env = dotenv.config();

const FORMAT = {
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	reset: '\x1b[0m'
};

(async function main() {
	const config = { ...env.parsed };
	const environments = {
		production: { prefix: 'STATIC_PROD' },
		staging: { prefix: 'STATIC_STAGE' }
	};

	for (const [envName, envConfig] of Object.entries(environments)) {
		if (await confirm(`Setup a ${FORMAT.yellow}${envName}${FORMAT.reset} environment?`)) {
			const projectVar = `${envConfig.prefix}_PROJECT`;
			const webappVar = `${envConfig.prefix}_WEBAPP_KEY`;
			let projectId = config[projectVar];
			let webappKey = config[webappVar];

			await authenticate();

			const setupProject =
				!config[projectVar] || (await confirm(`Replace existing ${envName} project, ${config[projectVar]}?`));
			if (setupProject) {
				projectId = await selectProject(envName);
				config[projectVar] = projectId;
			}

			const setupWebapp = !config[webappVar] || (await confirm(`Replace existing ${envName} webapp for ${projectId}?`));
			if (setupWebapp) {
				const webappName = await selectWebapp(projectId, envName);
				const webappConfig = await getFirebaseWebappConfig(webappName);
				webappKey = webappConfig.apiKey;
				config[webappVar] = webappKey;
			}
		}
	}

	const deployEnv = 'STATIC_DEPLOY_KEY';
	const deployPrompt = config[deployEnv] ? 'Generate a new Firebase deployment key?' : 'Generate a Firebase deployment key?';
	if (await confirm(deployPrompt)) {
		const deployKey = await getDeployKey();
		config[deployEnv] = deployKey;
	}

	const configString = JSON.stringify(config, null, 2);
	console.log(`Your new configuration: \n\n${FORMAT.green}${configString}${FORMAT.reset}\n`);

	(await confirm(`Store in ${FORMAT.yellow}.env${FORMAT.reset} (plaintext) for local use?`)) && saveEnvToFile(config);
	(await confirm(`Store in ${FORMAT.yellow}.travis.yml${FORMAT.reset} (encrypted) for CI/CD?`)) && saveEnvToTravis(config);
})();

async function saveEnvToTravis(obj) {
	const repo = await new Promise((res, rej) => {
		gitconfig('./', (err, config) => {
			if (err) {
				rej(err);
			} else {
				const url = config.remote.origin.url;
				const repoName = url
					.replace('https://github.com/', '')
					.replace('git@github.com:', '')
					.replace('.git', '');
				res(repoName);
			}
		});
	});
	for (const [key, value] of Object.entries(obj))
		spawnSync('yarn', `travis-encrypt --add -r ${repo} ${key}=${value}`.split(' '));
}

async function saveEnvToFile(obj) {
	const existing = env.parsed;
	const merged = { ...existing, ...obj };
	return new Promise((res, rej) => {
		const buff = Object.entries(merged)
			.map(([key, value]) => `${key}=${value}`)
			.join('\n')
			.concat('\n');
		const rootPath = __dirname
			.split('/scripts')
			.slice(0, -1)
			.join('');
		const envPath = path.resolve(rootPath, '.env');
		fs.writeFile(envPath, buff, (err) => {
			if (err) {
				rej(err);
			} else {
				res();
			}
		});
		res();
	});
}

async function getDeployKey() {
	return new Promise((res, rej) => {
		let stdout = '';
		const process = spawn('yarn', 'firebase login:ci'.split(' '), {
			stdio: ['inherit', 'pipe', 'pipe']
		});
		process.stdout.on('data', (chunk) => {
			console.log(chunk.toString());
			stdout += chunk;
		});
		process.on('exit', () => res(stdout.match(/1\/[^\n]+/g)[0]));
	});
}

async function selectWebapp(parent, label) {
	const webapps = ((await listFirebaseProjectApps(parent)) || []).filter((app) => app.platform === 'WEB');
	const { webapp } = await inquirer.prompt({
		type: 'list',
		message: `Select a webapp for ${label}`,
		name: 'webapp',
		choices: [
			{
				name: `${FORMAT.yellow}Create a new webapp...${FORMAT.reset}`,
				value: undefined
			},
			...webapps.map((webapp) => ({
				name: webapp.displayName || webapp.name,
				value: webapp.name
			}))
		]
	});
	if (!webapp) {
		const { name } = await inquirer.prompt({
			message: 'Enter a name for your new webapp:',
			name: 'name'
		});
		const createdWebapp = await createFirebaseWebapp(parent, name);
		console.log('Created new webapp', createdWebapp.name);
		return createdWebapp.name;
	} else {
		return webapp;
	}
}

async function selectProject(label) {
	const projects = (await listFirebaseProjects()) || [];
	const { project } = await inquirer.prompt({
		type: 'list',
		message: `Select a project for ${label}:`,
		name: 'project',
		choices: [
			{
				name: `${FORMAT.yellow}Create a new project...${FORMAT.reset}`,
				value: undefined
			},
			...projects.map((project) => ({
				name: project.displayName,
				value: project.projectId
			}))
		]
	});
	if (!project) {
		const { name } = await inquirer.prompt({
			message: 'Enter a name for your new project:',
			name: 'name'
		});
		const createdProject = await createFirebaseProject(name);
		console.log('Created new project', createdProject);
		return createdProject;
	} else {
		return project;
	}
}

async function confirm(message) {
	const { response } = await inquirer.prompt({
		name: 'response',
		type: 'confirm',
		message
	});
	return response;
}
