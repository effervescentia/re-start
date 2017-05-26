import babel from 'start-babel';
import eslint from 'start-eslint';
import mocha from 'start-mocha';
import typescript from 'start-typescript';
import webpack from 'start-webpack';
import * as istanbul from 'start-istanbul';
import prettyReporter from 'start-pretty-reporter';
import codecov from './reporters/codecov';

export const ES5 = {
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.js',
  bundleDir: 'bundle/',
  reportDir: 'coverage/',
  coverageReport: 'coverage/lcov.info',

  instrumentOpts: { esModules: true },
  reportOpts: ['lcovonly', 'html', 'text-summary'],

  bundle: webpack,
  reporter: prettyReporter,
  lint: eslint,
  test: mocha,
  instrument: istanbul.instrument,
  report: istanbul.report,
  reporters: [codecov]
};

export const ES6 = {
  ...ES5,

  copyFiles: [],
  copyDir: '',
  outDir: 'dist/',

  compile: babel
};

export const TYPESCRIPT = {
  ...ES6,

  srcFiles: 'src/index.ts',
  testFiles: 'test/**/*.ts',
  watchFiles: 'src/**/*.ts',
  lintFiles: ['src/**/*.ts', 'test/**/*.ts'],
  testWatchFiles: ['src/**/*.ts', 'test/**/*.ts'],
  scratchDir: '.scratch/',
  scratchTestFiles: '.scratch/test/**/*.js',
  coverageFiles: '.scratch/src/**/*.js',

  testCompileOpts: { compilerOptions: { sourceMap: false, declaration: false } },

  compile: typescript
};
