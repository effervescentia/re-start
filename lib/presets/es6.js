import prettyReporter from 'start-pretty-reporter';
import { babel } from '../commands/build';
import dev from '../commands/dev';
import { eslint } from '../commands/lint';
import { mocha } from '../commands/test';
import tdd from '../commands/tdd';
import ci from '../commands/ci';
import { istanbul } from '../commands/coverage';
import prepush from '../commands/prepush';
import codecov from '../reporters/codecov';
import { createPreset } from '../utils';

const OPTS = {
  reporter: prettyReporter,
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.js',
  reportDir: 'coverage/',
  coverageReport: 'coverage/lcov.info',
  outDir: 'dist/',
  instrumentOpts: { esModules: true },
  reportOpts: [ 'lcovonly', 'html', 'text-summary' ],
  reporters: [ codecov ]
};

const COMMANDS = {
  build: babel,
  lint: eslint,
  test: mocha,
  coverage: istanbul,
  dev,
  tdd,
  ci,
  prepush
};

export default createPreset(COMMANDS, OPTS);
