import clean from 'start-clean';
import files from 'start-files';
import inputConnector from 'start-input-connector';
import { TEST_ENV, optify } from '../utils';

export default (commands, opts) => commands.start(
  TEST_ENV,
  files(opts.reportDir),
  clean(),
  inputConnector(opts),
  ...optify(commands.testBuild),
  files(opts.coverageFiles || opts.srcFiles),
  opts.instrument(opts.instrumentOpts),
  inputConnector(opts),
  commands.test,
  opts.report(opts.reportOpts)
);
