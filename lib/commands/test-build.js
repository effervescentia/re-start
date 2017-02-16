import path from 'path';
import clean from 'start-clean';
import files from 'start-files';
import read from 'start-read';
import split from 'start-split';
import write from 'start-write';

/* eslint-disable indent */
export default (commands, opts) => () => commands.start(
    files(opts.scratchDir),
    clean(),
    files(opts.testFiles),
    read(),
    opts.compile(opts.testCompileOpts || opts.compileOpts),
    split({
      src: () => [write(path.join(opts.scratchDir, 'src'))],
      test: () => [write(path.join(opts.scratchDir, 'test'))]
    })
    /* eslint-disable immutable/no-mutation */
  )
  .then(() => Promise.resolve(opts.skipTestBuild = true))
  .catch((err) => {
    opts.skipTestBuild = true;
    throw err;
  });
