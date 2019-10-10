const tasks = (arr) => arr.join(' && ');

module.exports.hooks = {
	'pre-commit': tasks([
		'sort-package-json',
		'git add package.json',
		'pretty-quick --pattern "**/*.*(js|ts|jsx|tsx|json)" --staged',
		'pretty-quick --pattern "**/*.*(js|ts|jsx|tsx|json)" --since $(git rev-list HEAD | tail -n 1) --bail',
		'git stash --keep-index',
		'yarn test',
		'git stash pop'
	])
};
