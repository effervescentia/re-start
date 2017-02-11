import eslint from 'start-eslint';
import babel from 'start-babel';
import mocha from 'start-mocha';
import * as istanbul from 'start-istanbul';
import { ES6 } from './defaults';
import { createPreset, mix } from './utils';
import build from './commands/build';
import dev from './commands/dev';
import lint from './commands/lint';
import test from './commands/test';
import tdd from './commands/tdd';
import ci from './commands/ci';
import coverage from './commands/coverage';
import prepush from './commands/prepush';
// import release from './commands/release';

/* eslint-disable no-undefined */
const OPTS = mix(ES6, {
  reporterOpts: undefined,
  // releaseOpts: undefined,
  lint: eslint,
  compile: babel,
  compileOpts: undefined,
  test: mocha,
  testOpts: undefined,
  instrument: istanbul.instrument,
  report: istanbul.report
});
/* eslint-disable no-undefined */

const COMMANDS = {
  build,
  dev,
  lint,
  test,
  tdd,
  ci,
  coverage,
  prepush
  // release
};

export default createPreset(COMMANDS, OPTS);
