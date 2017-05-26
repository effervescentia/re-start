import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import write from 'start-write';
import inputConnector from 'start-input-connector';
import { PROD_ENV } from '../utils';

export default (commands, opts) => commands.start(
  PROD_ENV,
  files(opts.outDir),
  clean(),
  files(opts.srcFiles),
  read(),
  opts.compile(opts.compileOpts),
  write(opts.outDir),
  inputConnector(opts),
  commands.postBuild
);
