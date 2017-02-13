import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import watch from 'start-watch';
import write from 'start-write';
import { DEV_ENV } from '../utils';

export default (commands, opts) => () => commands.start(
  DEV_ENV,
  files(opts.outDir),
  clean(),
  files(opts.watchFiles || opts.srcFiles),
  watch((file) => commands.start(
    files(file),
    read(),
    opts.compile(opts.compileOpts),
    write(opts.outDir)
  ))
);
