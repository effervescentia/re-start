import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import split from 'start-split';
import typescript from 'start-typescript';
import write from 'start-write';
import startMocha from 'start-mocha';
import * as path from 'path';
import { mix, TEST_ENV } from '../utils';

const configurable = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.testFiles),
  opts.test(opts.testOpts)
);

export default configurable;

export const mocha = (commands, opts) =>
  configurable(commands, mix(opts, { test: startMocha }));

export const tsMocha = (commands, opts) => () => commands.start(
  TEST_ENV,
  files(opts.scratchDir),
  clean(),
  files(opts.testFiles),
  read(),
  typescript(opts.testCompileOpts || opts.compileOpts),
  split({
    src: () => [write(path.join(opts.scratchDir, 'src'))],
    test: () => [write(path.join(opts.scratchDir, 'test'))]
  }),
  files(opts.compiledTestFiles),
  startMocha()
);
