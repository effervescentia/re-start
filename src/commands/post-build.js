import copy from 'start-copy';
import files from 'start-files';

export default (commands, opts) => () => commands.start(
  files(opts.copyFiles),
  copy(opts.outDir)
);
