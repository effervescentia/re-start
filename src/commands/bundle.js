import path from 'path';
import clean from 'start-clean';
import env from 'start-env';
import files from 'start-files';
import watch from 'start-watch';
import webpack from 'start-webpack';

export const runWebpack = () => webpack(require(path.resolve(process.cwd(), 'webpack.config.js')));

export default (environment, watchFiles = false) => (commands, opts) => () =>
  commands.start(
    env('NODE_ENV', environment),
    files(opts.bundleDir),
    clean(),
    // eslint-disable-next-line no-ternary,max-len
    watchFiles ? watch(opts.bundleWatchFiles || opts.srcFiles)(() => commands.start(runWebpack())) : runWebpack()
  );
