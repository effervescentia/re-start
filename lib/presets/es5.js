import { eslint } from '../commands/lint';
import { mocha } from '../commands/test';
import tdd from '../commands/tdd';
import ci from '../commands/ci';
import { istanbul } from '../commands/coverage';
import codecov from '../reporters/codecov';
import prepush from '../commands/prepush';
import { createPreset } from '../utils';

const OPTS = {
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.js',
  testWatchFiles: ['src/**/*.js', 'test/**/*.js'],
  instrumentOpts: { esModules: true },
  reportDir: 'coverage/',
  reporterOpts: [ 'lcovonly', 'html', 'text-summary' ],
  coverageReport: 'coverage/lcov.info',
  reporters: [ codecov ]
};

const COMMANDS = {
  lint: eslint,
  test: mocha,
  coverage: istanbul,
  ci,
  tdd,
  prepush
};

export default createPreset(COMMANDS, OPTS);
