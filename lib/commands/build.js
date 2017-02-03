import startBabel from 'start-babel';
import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import write from 'start-write';
import { mix, PROD_ENV } from '../utils';

const configurable = (commands, opts) => () => commands.start(
  PROD_ENV,
  files(opts.outDir),
  clean(),
  files(opts.srcFiles),
  read(),
  opts.compile(opts.compileOpts),
  write(opts.outDir)
);

export default configurable;

export const babel = (commands, opts) =>
  configurable(commands, mix(opts, { compile: startBabel }));
