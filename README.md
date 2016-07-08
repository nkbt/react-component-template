# react-component-template [![npm](https://img.shields.io/npm/v/react-component-template.svg?style=flat-square)](https://www.npmjs.com/package/react-component-template)

[![Discord](https://img.shields.io/badge/chat-discord-blue.svg?style=flat-square)](https://discord.gg/013tGW1IMcW6Vd1o7)

[![CircleCI](https://img.shields.io/circleci/project/nkbt/react-component-template.svg?style=flat-square&label=nix-build)](https://circleci.com/gh/nkbt/react-component-template)
[![AppVeyor](https://img.shields.io/appveyor/ci/nkbt/react-component-template.svg?style=flat-square&label=win-build)](https://ci.appveyor.com/project/nkbt/react-component-template)
[![Coverage](https://img.shields.io/codecov/c/github/nkbt/react-component-template.svg?style=flat-square)](https://codecov.io/github/nkbt/react-component-template?branch=master)
[![Dependencies](https://img.shields.io/david/nkbt/react-component-template.svg?style=flat-square)](https://david-dm.org/nkbt/react-component-template)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/react-component-template.svg?style=flat-square)](https://david-dm.org/nkbt/react-component-template#info=devDependencies)

Base for React Components

## Reason

Developing and publishing multiple React components requires a lot of work to keep them all at the same code, ops, best-practices level. Most of configs are often copy-pasted. If one project updated, for example, .eslintrc, other projects should follow to keep codebase consistent. Having growing number of components leads to a more diverged codebase that is exponentially harder to manage.


## Contents

- React module boilerplate dependencies and scripts
- .gitignore and .npmignore
- CircleCI config
- ESLint config, strict version of Airbnb code style guide
- Empty React component
- Example
- Tests and coverage (Tape, Isparta)
- End-to-End tests (Nightwatch, Selenium)


## Usage

1. Install

  ```sh
  npm install --save-dev p-s react-component-template
  ```

2. Set npm scripts in `package.json` and set component name

  ```json
  {
    "config": {
      "component": "ReactComponentTemplate"
    },
    "scripts": {
      "start": "p-s --config react-component-template/package-scripts -s",
      "test": "npm start test",
      "precommit": "npm start precommit",
      "prepush": "npm start prepush",
      "postversion": "npm start postversion",
      "prepublish": "npm start prepublish"
    }
  }
  ```

3. Create `webpack.config.js`

  ```js
  'use strict';

  module.exports = require('react-component-template/webpack.config');
  ```

4. Create `.eslintrc`

  ```json
  {
    "extends": "./node_modules/react-component-template/.eslintrc"
  }
  ```

5. Other files

  There is a `react-component-template` scaffold generator, install it:
  ```sh
  npm install -g cf-react-component-template
  ```
  and answer some questions, for example:
  ```sh
  cf-react-component-template

  Your name: Nik Butenko
  Your email (will be publicly available, optional): nik@butenko.me
  Your GitHub public username: nkbt
  Package name: my-awesome-react-lib
  Global package name (CamelCased): MyAwesomeReactLib
  Package description: My awesome React library
  ```

## License

MIT
