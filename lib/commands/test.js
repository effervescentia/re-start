import files from 'start-files';
import startMocha from 'start-mocha';
import { mix, TEST_ENV } from '../utils';

const configurable = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.testFiles),
  opts.test(opts.testOpts)
);

export default configurable;

export const mocha = (commands, opts) =>
  configurable(commands, mix(opts, { test: startMocha }));
