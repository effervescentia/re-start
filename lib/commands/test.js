import files from 'start-files';
import { TEST_ENV, optify } from '../utils';

export default (commands, opts) => () => commands.start(
  TEST_ENV,
  ...optify(commands.testBuild),
  files(opts.scratchTestFiles || opts.testFiles),
  opts.test(opts.testOpts)
);
