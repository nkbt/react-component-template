exports.scripts = {
  ghPages: [
    'p-s build.ghPages',
    'gh-pages --dist example'
  ].join(' && '),
//   ghPages: [
//     'git fetch origin',
//     'git checkout gh-pages',
//     'git rebase origin/master --force-rebase',
//     'npm run build',
//     'git add .',
//     'git commit --amend --no-edit',
//     'git push --force', 'git checkout master'
//   ].join(' && '),
  build: {
    default: [
      'rimraf lib example build',
      'p-s --parallel build.lib,build.ghPages,build.dist,build.min'
    ].join(' && '),
    lib: `cross-env NODE_ENV=production
        babel src --out-dir lib --source-maps --ignore src/example`,
    ghPages: 'cross-env NODE_ENV=production BUILD=ghPages webpack',
    dist: 'cross-env NODE_ENV=production BUILD=dist webpack',
    min: 'cross-env NODE_ENV=production BUILD=min webpack'
  },
  prepublish: 'p-s --parallel build:lib,build:dist,build:min',
  start: 'cross-env NODE_ENV=development webpack-dev-server',
  test: {
    default: 'cross-env NODE_ENV=test babel-node test',
    dev: 'p-s test | tap-nyan',
    cov: `cross-env NODE_ENV=test
        babel-node node_modules/isparta/bin/isparta cover
        --report text --report html --report lcov --dir reports/coverage test`,
    e2e: 'cross-env NODE_ENV=development nightwatch-autorun'
  },
  lint: 'eslint --cache .',
  precommit: 'p-s lint',
  prepush: 'p-s test',
  postversion: 'git push --follow-tags'
};
