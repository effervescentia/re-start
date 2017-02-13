import files from 'start-files';
import { rayify, TEST_ENV } from '../utils';

const configurable = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.lintFiles || [...rayify(opts.srcFiles), ...rayify(opts.testFiles)]),
  opts.lint(opts.lintOpts)
);

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
