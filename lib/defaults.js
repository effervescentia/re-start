import prettyReporter from 'start-pretty-reporter';
import { mix } from './utils';
import codecov from './reporters/codecov';

export const ES5 = {
  srcFiles: 'src/**/*.js',
  testFiles: 'test/**/*.js',
  reporter: prettyReporter,
  reportDir: 'coverage/',
  coverageReport: 'coverage/lcov.info',
  instrumentOpts: { esModules: true },
  reportOpts: [ 'lcovonly', 'html', 'text-summary' ],
  reporters: [ codecov ]
};

export const ES6 = mix(ES5, { outDir: 'dist/' });

export const TYPESCRIPT = mix(ES6, {
  srcFiles: 'src/index.ts',
  testFiles: 'test/index.ts',
  scratchTestFiles: '.scratch/test/index.js',
  watchFiles: 'src/**/*.ts',
  lintFiles: [ 'src/**/*.ts', 'test/**/*.ts' ],
  testWatchFiles: [ 'src/**/*.ts', 'test/**/*.ts' ],
  coverageFiles: '.scratch/src/**/*.js',
  scratchDir: '.scratch/',
  testCompileOpts: { compilerOptions: { sourceMap: false, declaration: false } }
});
