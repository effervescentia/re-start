import clean from 'start-clean';
import files from 'start-files';
import mocha from 'start-mocha';
import { instrument, report } from 'start-istanbul';
import { mix, TEST_ENV } from '../utils';
import { testBuild } from './typescript';

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

export const tsIstanbul = (commands, opts) => () => commands.start(
  TEST_ENV,
  files([ opts.scratchDir, opts.reportDir ]),
  clean(),
  testBuild(commands, opts),
  files(opts.coverageFiles),
  istanbul.instrument(opts.instrumentOpts),
  files(opts.scratchTestFiles),
  mocha(),
  istanbul.report(opts.reportOpts)
);
