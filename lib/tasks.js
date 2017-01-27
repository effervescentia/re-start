import Start from 'start';
import prettyReporter from 'start-pretty-reporter';
import env from 'start-env';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';
import standard from 'start-standard';
import mocha from 'start-mocha';
import * as istanbul from 'start-istanbul';
import codecov from 'start-codecov';

const DEFAULTS = {
  reporter: prettyReporter,
  srcFiles: 'lib/**/*.js',
  testFiles: 'test/**/*.js',
  reportDir: 'coverage/',
  outDir: 'build/',
  lint: standard,
  compile: babel,
  test: mocha,
  instrument: istanbul.instrument,
  instrumentOpts: { esModules: true },
  report: istanbul.report,
  reportOpts: [ 'lcovonly', 'html', 'text-summary' ],
  coverage: codecov,
  coverageReport: 'coverage/lcov.info'
};

export default function restart (rawOpts = {}) {
  const opts = Object.assign({}, DEFAULTS, rawOpts);
  const tasks = {};

  const start = tasks.start = Start(opts.reporter());

  tasks.build = () => start(
    env('NODE_ENV', 'production'),
    files(opts.outDir),
    clean(),
    files(opts.srcFiles),
    read(),
    opts.compile(),
    write(opts.outDir)
  );

  tasks.dev = () => start(
    env('NODE_ENV', 'development'),
    files(opts.outDir),
    clean(),
    files(opts.srcFiles),
    watch((file) => start(
      files(file),
      read(),
      opts.compile(),
      write(opts.outDir)
    ))
  );

  tasks.lint = () => start(
    env('NODE_ENV', 'test'),
    files([ ...rayify(opts.srcFiles), ...rayify(opts.outDir) ]),
    opts.lint()
  );

  tasks.test = () => start(
    env('NODE_ENV', 'test'),
    files(opts.testFiles),
    mocha()
  );

  tasks.tdd = () => start(
    files([ ...rayify(opts.srcFiles), ...rayify(opts.outDir) ]),
    watch(tasks.test)
  );

  tasks.coverage = () => start(
    env('NODE_ENV', 'test'),
    files(opts.reportDir),
    clean(),
    files(opts.srcFiles),
    opts.instrument(opts.instrumentOpts),
    tasks.test(opts),
    opts.report(opts.reportOpts)
  );

  tasks.ci = () => start(
    tasks.lint(opts),
    tasks.coverage(opts),
    files(opts.coverageReport),
    read(),
    opts.coverage()
  );

  tasks.prepush = () => start(
    tasks.lint(opts),
    tasks.coverage(opts)
  );

  return tasks;
}

const rayify = (files) => Array.isArray(files) ? files : [files];
