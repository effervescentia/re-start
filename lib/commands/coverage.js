import clean from 'start-clean';
import files from 'start-files';
import { instrument, report } from 'start-istanbul';
import { mix, TEST_ENV } from '../utils';

const configurable = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.reportDir),
  clean(),
  files(opts.coverageFiles || opts.srcFiles),
  opts.instrument(opts.instrumentOpts),
  commands.test,
  opts.report(opts.reportOpts)
);

export default configurable;

export const istanbul = (commands, opts) =>
  configurable(commands, mix(opts, { instrument, report }));
