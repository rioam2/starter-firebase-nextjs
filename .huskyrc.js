const tasks = (arr) => arr.join(' && ');

module.exports.hooks = {
	'pre-commit': tasks([
		'sort-package-json',
		'git add package.json',
		'pretty-quick --staged',
		'pretty-quick --since $(git rev-list HEAD | tail -n 1) --bail',
		'git stash --keep-index',
		'yarn test',
		'git stash pop'
	])
};
