import glob from 'glob';

import cssHook from 'css-modules-require-hook';
cssHook({generateScopedName: '[name]__[local]'});

glob.sync('**/*-test.js', {realpath: true, cwd: __dirname}).forEach(require);
