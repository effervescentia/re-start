import clean from 'start-clean';
import files from 'start-files';
import { TEST_ENV, optify } from '../utils';
import test from './test';

const configurable = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.reportDir),
  clean(),
  ...optify(commands.testBuild),
  files(opts.coverageFiles || opts.srcFiles),
  opts.instrument(opts.instrumentOpts),
  commands.test,
  opts.report(opts.reportOpts)
);

export default configurable;

export const tsCoverage = (commands, opts) =>
  configurable({
    ...commands,
    ...{
      test: test({
        ...commands,
        ...{ testBuild: null }
      }, opts)
    }
  }, opts);
