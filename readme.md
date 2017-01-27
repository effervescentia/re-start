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

### Configuration

- `reporter` - the reporter to use. *default*: `start-pretty-reporter`
- `reporterOpts` - opts passed to the reporter
- `lint` - the lint task. *default*: `start-standard`
- `lintOpts` - opts passed to the lint task
- `compile` - the compile task. *default*: `start-babel`
- `compileOpts` - opts passed to the compile task
- `test` - the test test. *default*: `start-mocha`
- `testOpts` - opts passed to the test task
- `instrument` - the coverage instrumentation task. *default*: `start-istanbul.instrument`
- `instrumentOpts` - opts passed to the instrument task. *default*: `{ esModules: true }`
- `report` - the coverage reporting task. *default*: `start-istanbul.report`
- `reportOpts` - opts passed to the reporting task. *default*: `[ 'lcovonly', 'html', 'text-summary' ]`
- `exportCoverage` - the task to export coverage reports. *default*: `start-codecov`
- `exportCoverageOpts` - opts passed to the coverage export task
- `srcFiles` - source file glob or glob array. *default*: `'src/**/*.js'`
- `testFiles` - test file glob or glob array. *default*: `'test/**/*.js'`
- `reportDir` - directory for coverage reports. *default*: `'coverage/'`
- `outDir` - directory for compiled code. *default*: `'build/'`
- `coverageReport` - coverage report file. *default*: `'coverage/lcov.info'`


### Customized

```js
// tasks.js
import { restart } from 're-start';
import tape from 'start-tape';
import tapSpec from 'tap-spec';

module.exports = restart({ testOpts: tapSpec, test: tape });


// package.json
"scripts": {
  "start": "start-runner --preset tasks.js"
}
```

or put the configuration in your `package.json`

```js
// package.json
"config": {
  "restart": {
    "lintOpts": "semistandard"
  }
}
```

### Hijack a command

Want to override a single command without having to repeat existing depending workflows?
Re-start commands target the references in the exported module, so you can simply
replace the whole `lint` phase with it's inherent ties to `ci` and `prepush`
with little more than the following:

```js
import { restart } from 're-start';
import env from 'start-env';
import files from 'start-files';
import eslint from 'start-eslint';

const commands = module.exports = restart();

commands.lint = () => commands.start(
  env('NODE_ENV', 'lint'),
  files('test/**/*.js'),
  eslint()
);
```

### Available tasks

- *`build`* - `[ENV: production]` __in(__`srcFiles`__) -> `compile()` -> out(__`outDir`__)__
- *`dev`* - `[ENV: development]` __in(__`srcFiles`__) -> watch(`compile()`) -> out(__`outDir`__)__
- *`lint`* - `[ENV: lint]` __in(__`srcFiles + testFiles`__) -> lint()__
- *`test`* - `[ENV: test]` __in(__`testFiles`__) -> `test()`__
- *`tdd`* - `[ENV: test]` __in(__`test`__) -> watch(__*`test`*__)__
- *`coverage`* - `[ENV: test]` __in(__`srcFiles`__) -> `instrument()` -> __*`test`*__ -> `report()`__
- *`ci`* - `[ENV: test]` *`lint`*__ -> __*`coverage`*__ -> in(__`coverageReport`__) -> `exportCoverage()`__
- *`prepush`* -> `[ENV: test]` *`lint`*__->__*`coverage`*

Available commands: same commands as `start-start-preset`.

### Extend

[Examples](https://github.com/start-runner/start-preset#extend) of extending a preset.
