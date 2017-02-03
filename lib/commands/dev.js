import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import watch from 'start-watch';
import write from 'start-write';
import { mix, DEV_ENV } from '../utils';

const configurable = (commands, opts) => () => commands.start(
  DEV_ENV,
  files(opts.outDir),
  clean(),
  files(opts.watchFiles),
  watch((file) => commands.start(
    files(file),
    read(),
    opts.compile(opts.compileOpts),
    write(opts.outDir)
  ))
);

export default configurable;

export const babel = (commands, opts) =>
  configurable(commands, mix(opts, { compile: babel }));
