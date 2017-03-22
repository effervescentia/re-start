import files from 'start-files';
import { TEST_ENV, optify } from '../utils';

/* eslint-disable indent,no-return-assign,immutable/no-mutation */
export default (commands, opts) => () => commands.start(
    TEST_ENV,
    ...optify(!opts.skipTestBuild && commands.testBuild),
    files(opts.scratchTestFiles || opts.testFiles),
    opts.test(opts.testOpts)
  )
  .then(() => Promise.resolve(opts.skipTestBuild = false))
  .catch((err) => {
    opts.skipTestBuild = false;
    throw err;
  });
