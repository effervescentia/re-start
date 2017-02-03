import prettyReporter from 'start-pretty-reporter';
import { mix } from './utils';
import codecov from './reporters/codecov';

export const ES5 = {
  reporter: prettyReporter,
  srcFiles: 'src/**/*.js',
  lintFiles: ['src/**/*.js', 'test/**/*.js'],
  testFiles: 'test/**/*.js',
  coverageFiles: 'src/**/*.js',
  testWatchFiles: ['src/**/*.js', 'test/**/*.js'],
  reportDir: 'coverage/',
  coverageReport: 'coverage/lcov.info',
  instrumentOpts: { esModules: true },
  reportOpts: [ 'lcovonly', 'html', 'text-summary' ],
  reporters: [ codecov ]
};

export const ES6 = mix(ES5, {
  watchFiles: 'src/**/*.js',
  outDir: 'dist/'
});
