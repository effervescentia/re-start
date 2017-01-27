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
import { config } from './config';

const DEFAULTS = {
  reporter: prettyReporter,
  reporterOpts: undefined,
  srcFiles: 'lib/**/*.js',
  testFiles: 'test/**/*.js',
  reportDir: 'coverage/',
  coverageReport: 'coverage/lcov.info',
  outDir: 'build/',
  lint: standard,
  lintOpts: undefined,
  compile: babel,
  compileOpts: undefined,
  test: mocha,
  testOpts: undefined,
  instrument: istanbul.instrument,
  instrumentOpts: { esModules: true },
  report: istanbul.report,
  reportOpts: [ 'lcovonly', 'html', 'text-summary' ],
  coverage: codecov,
  coverageOpts: undefined
};

export default function restart (rawOpts = {}) {
  const opts = Object.assign({}, DEFAULTS, (config || {}).restart, rawOpts);
  const tasks = {};

  tasks.start = Start(opts.reporter(opts.reporterOpts));

  tasks.build = () => tasks.start(
    env('NODE_ENV', 'production'),
    files(opts.outDir),
    clean(),
    files(opts.srcFiles),
    read(),
    opts.compile(opts.compileOpts),
    write(opts.outDir)
  );

  tasks.dev = () => tasks.start(
    env('NODE_ENV', 'development'),
    files(opts.outDir),
    clean(),
    files(opts.srcFiles),
    watch((file) => tasks.start(
      files(file),
      read(),
      opts.compile(opts.compileOpts),
      write(opts.outDir)
    ))
  );

  tasks.lint = () => tasks.start(
    env('NODE_ENV', 'test'),
    files([ ...rayify(opts.srcFiles), ...rayify(opts.outDir) ]),
    opts.lint(opts.lintOpts)
  );

  tasks.test = () => tasks.start(
    env('NODE_ENV', 'test'),
    files(opts.testFiles),
    opts.test(opts.testOpts)
  );

  tasks.tdd = () => tasks.start(
    files([ ...rayify(opts.srcFiles), ...rayify(opts.outDir) ]),
    watch(tasks.test)
  );

  tasks.coverage = () => tasks.start(
    env('NODE_ENV', 'test'),
    files(opts.reportDir),
    clean(),
    files(opts.srcFiles),
    opts.instrument(opts.instrumentOpts),
    tasks.test(opts),
    opts.report(opts.reportOpts)
  );

  tasks.ci = () => tasks.start(
    tasks.lint(opts),
    tasks.coverage(opts),
    files(opts.coverageReport),
    read(),
    opts.coverage(opts.coverageOpts)
  );

  tasks.prepush = () => tasks.start(
    tasks.lint(opts),
    tasks.coverage(opts)
  );

  return tasks;
}

const rayify = (files) => Array.isArray(files) ? files : [files];
