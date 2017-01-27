# re-start

[![npm](https://img.shields.io/npm/v/re-start.svg?style=flat-square)](https://www.npmjs.com/package/re-start)
[![linux build](https://img.shields.io/circleci/project/github/effervescentia/re-start/master.svg?label=linux&style=flat-square)](https://circleci.com/gh/effervescentia/re-start)
[![windows build](https://img.shields.io/appveyor/ci/effervescentia/re-start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/effervescentia/re-start)
[![deps](https://david-dm.org/effervescentia/re-start.svg?style=flat-square)](https://david-dm.org/effervescentia/re-start)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Install

```sh
npm install --save-dev re-start
# or
yarn add --dev re-start
```

## Usage

See [documentation](https://github.com/start-runner/start#readme) and [source tasks file](lib/index.js) for details.

### Simple

```js
// package.json
"scripts": {
  "start": "start-runner --preset re-start"
}
```

Available commands: same commands as `start-start-preset`.

### Extend

[Examples](https://github.com/start-runner/start-preset#extend)  of extending a preset.
