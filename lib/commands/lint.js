import startEslint from 'start-eslint';
import files from 'start-files';
import { mix, rayify, TEST_ENV } from '../utils';

const configurable = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.lintFiles || [ ...rayify(opts.srcFiles), ...rayify(opts.testFiles) ]),
  opts.lint(opts.lintOpts)
);

export default configurable;

export const eslint = (commands, opts) =>
  configurable(commands, mix(opts, { lint: startEslint }));
