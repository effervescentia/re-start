import files from 'start-files';
import { command, rayify, TEST_ENV } from '../utils';

const configurable = (commands, rawOpts) =>
  command((opts) => commands.start(
    TEST_ENV,
    files(opts.lintFiles || [...rayify(opts.srcFiles), ...rayify(opts.testFiles)]),
    opts.lint(opts.lintOpts)
  ), rawOpts);

export default configurable;

const tsLint = (commands, opts) =>
  configurable(commands, {
    ...opts,
    ...{
      lint: () => () => function tslint(log) {
        log('unable to lint typescript... yet');
        log('¯\\_(ツ)_/¯');

        return Promise.resolve();
      }
    }
  });

export { tsLint as tslint };
