import clean from 'start-clean';
import files from 'start-files';
import startMocha from 'start-mocha';
import { mix, TEST_ENV } from '../utils';
import { testBuild } from './typescript';

const configurable = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.testFiles),
  opts.test(opts.testOpts)
);

export default configurable;

export const mocha = (commands, opts) =>
  configurable(commands, mix(opts, { test: startMocha }));

export const tsMocha = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.scratchDir),
  clean(),
  testBuild(commands, opts),
  files(opts.scratchTestFiles),
  startMocha()
);
