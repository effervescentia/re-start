# re-start

[![npm](https://img.shields.io/npm/v/re-start.svg?style=flat-square)](https://www.npmjs.com/package/re-start)
[![linux build](https://img.shields.io/circleci/project/github/effervescentia/re-start/master.svg?label=linux&style=flat-square)](https://circleci.com/gh/effervescentia/re-start)
[![windows build](https://img.shields.io/appveyor/ci/effervescentia/re-start/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/effervescentia/re-start)
[![deps](https://david-dm.org/effervescentia/re-start.svg?style=flat-square)](https://david-dm.org/effervescentia/re-start)

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

⚙️ Configurable [Start](https://github.com/start-runner/start) preset

## Install

```sh
npm install --save-dev re-start
# or
yarn add --dev re-start
```

## Usage

See [documentation](https://github.com/start-runner/start#readme) and [source tasks file](lib/index.js) for details.

### Default (ES6)

```js
// package.json
"scripts": {
  "start": "start-runner --preset re-start"
}
```

#### Included Presets

-   `typescript`:
    -   `bundle` - `start-webpack`
    -   `compile` - `start-typescript`
    -   `test` - `start-mocha`
    -   `instrument` & `report` - `start-istanbul`
    -   `lint` - *currently unsupported*
-   `es6`:
    -   `bundle` - `start-webpack`
    -   `compile` - `babel`
    -   `test` - `start-mocha`
    -   `instrument` & `report` - `start-istanbul`
    -   `lint` - `eslint`
-   `es5`:
    -   `bundle` - `start-webpack`
    -   `test` - `start-mocha`
    -   `instrument` & `report` - `start-istanbul`
    -   `lint` - `eslint`

Example:

```js
// package.json
"scripts": {
  "start": "start-runner --preset re-start/presets/typescript"
}
```

### Configuration

-   `reporter` - the reporter to use. *default*: `start-pretty-reporter`

#### tasks
-   `lint` - the lint task. *default*: `start-eslint`
-   `bundle` - the bundle task. *default*: `start-webpack`
-   `compile` - the compile task. *default*: `start-babel`
-   `test` - the test test. *default*: `start-mocha`
-   `instrument` - the coverage instrumentation task. *default*: `start-istanbul.instrument`
-   `report` - the coverage reporting task. *default*: `start-istanbul.report`
-   `exportCoverage` - the task to export coverage reports. *default*: `start-codecov`

#### options
-   `reporterOpts` - opts passed to the reporter
-   `releaseOpts` - opts passed to `start-release`
-   `lintOpts` - opts passed to the lint task
-   `compileOpts` - opts passed to the compile task
-   `testCompileOpts` - opts passed to the compile task during test (typecript)
-   `testOpts` - opts passed to the test task
-   `instrumentOpts` - opts passed to the instrument task. *default*: `{ esModules: true }`
-   `reportOpts` - opts passed to the reporting task. *default*: `[ 'lcovonly', 'html', 'text-summary' ]`
-   `exportCoverageOpts` - opts passed to the coverage export task

#### files
-   `srcFiles` - source file glob or glob array. *default*: `'src/**/*.js'`
-   `testFiles` - test file glob or glob array. *default*: `'test/**/*.js'`
-   `lintFiles` - files to read for `lint` command. *default*: `[...srcFiles, ...testFiles]`
-   `coverageFiles` - files to instrument with `instrument` task. *default*: `srcFiles`
-   `watchFiles` - files to watch for `dev` command. *default*: `srcFiles`
-   `testWatchFiles` - files to watch for `tdd` command. *default*: `[...srcFiles, ...testFiles]`
-   `reportDir` - directory for coverage reports. *default*: `'coverage/'`
-   `outDir` - directory for compiled code. *default*: `'dist/'`
-   `bundleDir` - directory for bundled code. *default*: `'bundle/'`
-   `coverageReport` - coverage report file. *default*: `'coverage/lcov.info'`

#### files (typescript-specific)
-   `srcFiles` - source file glob or glob array. *default*: `'src/index.ts'`
-   `testFiles` - test file glob or glob array. *default*: `'test/**/*.ts'`
-   `scratchTestFiles` - compiled test file glob or glob array. *default*: `'.scratch/test/**/*.js'`
-   `lintFiles` - files to read for `lint` command. *default*: `['src/**/*.ts', 'test/**/*.ts']`
-   `coverageFiles` - files to instrument with `instrument` task. *default*: `'.scratch/src/**/*.js'`
-   `watchFiles` - files to watch for `dev` command. *default*: `'src/**/*.ts'`
-   `testWatchFiles` - files to watch for `tdd` command. *default*: `['src/**/*.ts', 'test/**/*.ts']`
-   `scratchDir` - directory for compiled code for test. *default*: `'.scratch/'`


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

### Available commands

-   *`build`* \* - `[ENV: production]` __in(__`srcFiles`__) -> `compile()` -> out(__`outDir`__)__
-   *`dev`* \* - `[ENV: development]` __in(__`watchFiles`__or__`srcFiles`__) -> watch(`compile()`) -> out(__`outDir`__)__
-   *`bundle`* - `[ENV: development]` __in(__`srcFiles`__) -> `bundle()` -> out(__`bundleDir`__)__
-   *`bundle:prod`* - `[ENV: production]` __in(__`srcFiles`__) -> `bundle()` -> out(__`bundleDir`__)__
-   *`bundle:watch`* - `[ENV: development]` __in(__`srcFiles`__) -> watch(__*`bundle()`*__)__
-   *`bundle:watch:prod`* - `[ENV: production]` __in(__`srcFiles`__) -> watch(__*`bundle()`*__)__
-   *`lint`* - `[ENV: test]` __in(__`lintFiles`__or__`srcFiles + testFiles`__) -> lint()__
-   *`test`* - `[ENV: test]` __in(__`testFiles`__) -> `test()`__
-   *`tdd`* - `[ENV: test]` __in(__`testWatchFiles`__or__`testFiles`__) -> watch(__*`test`*__)__
-   *`coverage`* - `[ENV: test]` __in(__`coverageFiles`__or__`srcFiles`__) -> `instrument()` ->__ *`test`* __-> `report()`__
-   *`ci`* - `[ENV: test]` *`lint`* __->__ *`coverage`* __-> in(__`coverageReport`__) -> `exportCoverage()`__
-   *`prepush`* -> `[ENV: test]` *`lint`* __->__ *`coverage`*
-   *`release`* -> `[ENV: production]` `release()`

\* not available with the `es5` preset

### Extend

[Examples](https://github.com/start-runner/start-preset#extend) of extending a preset.
