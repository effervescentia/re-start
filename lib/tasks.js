import prettyReporter from 'start-pretty-reporter';
import eslint from 'start-eslint';
import babel from 'start-babel';
import mocha from 'start-mocha';
import * as istanbul from 'start-istanbul';
import { createPreset } from './utils';
import build from './commands/build';
import dev from './commands/dev';
import lint from './commands/lint';
import test from './commands/test';
import tdd from './commands/tdd';
import ci from './commands/ci';
import coverage from './commands/coverage';
import prepush from './commands/prepush';
import codecov from './reporters/codecov';

const OPTS = {
  reporter: prettyReporter,
  reporterOpts: undefined,
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.js',
  lintFiles: undefined,
  coverageFiles: undefined,
  watchFiles: undefined,
  testWatchFiles: undefined,
  reportDir: 'coverage/',
  coverageReport: 'coverage/lcov.info',
  outDir: 'dist/',
  lint: eslint,
  lintOpts: undefined,
  compile: babel,
  compileOpts: undefined,
  test: mocha,
  testOpts: undefined,
  instrument: istanbul.instrument,
  instrumentOpts: { esModules: true },
  report: istanbul.report,
  reportOpts: [ 'lcovonly', 'html', 'text-summary' ],
  reporters: [ codecov ]
};

const COMMANDS = {
  build,
  dev,
  lint,
  test,
  tdd,
  ci,
  coverage,
  prepush
};

export default createPreset(COMMANDS, OPTS);
