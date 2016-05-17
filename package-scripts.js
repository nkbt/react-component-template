const pathTo = require('path').join.bind(null, process.cwd());

exports.scripts = {
  dev: 'cross-env NODE_ENV=development webpack-dev-server',
  ghPages: [
    'npm start -- build.ghPages',
    `gh-pages --dist ${pathTo('example')}`
  ].join(' && '),
  build: {
    default: [
      `rimraf ${pathTo('lib')} ${pathTo('example')} ${pathTo('build')}`,
      'npm start -- --parallel build.lib,build.ghPages,build.dist,build.min'
    ].join(' && '),
    lib: 'cross-env NODE_ENV=production' +
    `     babel ${pathTo('src')} --out-dir ${pathTo('lib')}` +
    `     --source-maps --ignore ${pathTo('src', 'example')}`,
    ghPages: 'cross-env NODE_ENV=production BUILD=ghPages webpack',
    dist: 'cross-env NODE_ENV=production BUILD=dist webpack',
    min: 'cross-env NODE_ENV=production BUILD=min webpack'
  },
  prepublish: 'npm start -- --parallel build.lib,build.dist,build.min',
  test: {
    default: `cross-env NODE_ENV=test babel-node ${pathTo('test')}`,
    dev: 'npm start -- test | tap-nyan',
    cov: 'cross-env NODE_ENV=test' +
    '     babel-node node_modules/isparta/bin/isparta cover' +
    `     --report text --report html --report lcov --dir reports/coverage ${pathTo('test')}`,
    e2e: 'cross-env NODE_ENV=development nightwatch-autorun'
  },
  lint: `eslint --cache ${pathTo('.')}`,
  precommit: 'npm start -- lint',
  prepush: 'npm start -- test',
  postversion: 'git push --follow-tags',
  ci: {
    lint: [
      'eslint --debug . --format tap > ${CIRCLE_ARTIFACTS}/lint.log',
      'cat ${CIRCLE_ARTIFACTS}/lint.log | tap-xunit > ${CIRCLE_TEST_REPORTS}/lint.xml'
    ].join(' && '),
    test: [
      'NODE_ENV=test babel-node test > ${CIRCLE_ARTIFACTS}/test.log',
      'cat ${CIRCLE_ARTIFACTS}/test.log | tap-xunit > ${CIRCLE_TEST_REPORTS}/test.xml'
    ].join(' && '),
    cov: 'NODE_ENV=test babel-node node_modules/isparta/bin/isparta cover ' +
    '     --report text --report lcov --verbose --dir ${CIRCLE_ARTIFACTS}/coverage test/index.js',
    e2e: 'REPORT_DIR=${CIRCLE_TEST_REPORTS} LOG_DIR=${CIRCLE_ARTIFACTS}' +
    '     NODE_ENV=development nightwatch-autorun',
    codecov: 'cat ${CIRCLE_ARTIFACTS}/coverage/lcov.info | codecov'
  }
};
