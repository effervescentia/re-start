import path from 'path';
import files from 'start-files';
import read from 'start-read';
import split from 'start-split';
import typescript from 'start-typescript';
import write from 'start-write';

// eslint-disable-next-line import/prefer-default-export
export const testBuild = (commands, opts) => () => commands.start(
  files(opts.testFiles),
  read(),
  typescript(opts.testCompileOpts || opts.compileOpts),
  split({
    src: () => [ write(path.join(opts.scratchDir, 'src')) ],
    test: () => [ write(path.join(opts.scratchDir, 'test')) ]
  }),
);
