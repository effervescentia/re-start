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
  exportCoverage: codecov,
  exportCoverageOpts: undefined
};

export default function restart (rawOpts = {}) {
  const opts = Object.assign({}, DEFAULTS, (config || {}).restart, rawOpts);
  const commands = {};

  commands.start = Start(opts.reporter(opts.reporterOpts));

  commands.build = () => commands.start(
    env('NODE_ENV', 'production'),
    files(opts.outDir),
    clean(),
    files(opts.srcFiles),
    read(),
    opts.compile(opts.compileOpts),
    write(opts.outDir)
  );

  commands.dev = () => commands.start(
    env('NODE_ENV', 'development'),
    files(opts.outDir),
    clean(),
    files(opts.srcFiles),
    watch((file) => commands.start(
      files(file),
      read(),
      opts.compile(opts.compileOpts),
      write(opts.outDir)
    ))
  );

  commands.lint = () => commands.start(
    env('NODE_ENV', 'test'),
    files([ ...rayify(opts.srcFiles), ...rayify(opts.testFiles) ]),
    opts.lint(opts.lintOpts)
  );

  commands.test = () => commands.start(
    env('NODE_ENV', 'test'),
    files(opts.testFiles),
    opts.test(opts.testOpts)
  );

  commands.tdd = () => commands.start(
    files([ ...rayify(opts.srcFiles), ...rayify(opts.testFiles) ]),
    watch(commands.test)
  );

  commands.coverage = () => commands.start(
    env('NODE_ENV', 'test'),
    files(opts.reportDir),
    clean(),
    files(opts.srcFiles),
    opts.instrument(opts.instrumentOpts),
    commands.test(opts),
    opts.report(opts.reportOpts)
  );

  commands.ci = () => commands.start(
    commands.lint(opts),
    commands.coverage(opts),
    files(opts.coverageReport),
    read(),
    opts.exportCoverage(opts.exportCoverageOpts)
  );

  commands.prepush = () => commands.start(
    commands.lint(opts),
    commands.coverage(opts)
  );

  return commands;
}

const rayify = (files) => Array.isArray(files) ? files : [files];
