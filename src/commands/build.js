import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import write from 'start-write';
import { PROD_ENV, command } from '../utils';

export default (commands, rawOpts) =>
command((opts) => commands.start(
  PROD_ENV,
  files(opts.outDir),
  clean(),
  files(opts.srcFiles),
  read(),
  opts.compile(opts.compileOpts),
  write(opts.outDir),
  commands.postBuild
), rawOpts);
