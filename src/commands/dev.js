import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import watch from 'start-watch';
import write from 'start-write';
import { DEV_ENV, command } from '../utils';

export default (commands, rawOpts) =>
command((opts) => commands.start(
  DEV_ENV,
  files(opts.outDir),
  clean(),
  watch(opts.watchFiles || opts.srcFiles)((file) => commands.start(
    files(file),
    read(),
    opts.compile(opts.compileOpts),
    write(opts.outDir),
    commands.postBuild
  ))
), rawOpts);
