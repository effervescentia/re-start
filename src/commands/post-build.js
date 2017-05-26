import copy from 'start-copy';
import files from 'start-files';
import { command } from '../utils';

export default (commands, rawOpts) =>
command((opts) => commands.start(
  files(opts.copyFiles),
  copy(opts.outDir)
), rawOpts);
