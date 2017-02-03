import prettyReporter from 'start-pretty-reporter';
import { mix } from './utils';
import codecov from './reporters/codecov';

export const ES5 = mix(fileGlobs(), {
  reporter: prettyReporter,
  reportDir: 'coverage/',
  coverageReport: 'coverage/lcov.info',
  instrumentOpts: { esModules: true },
  reportOpts: [ 'lcovonly', 'html', 'text-summary' ],
  reporters: [ codecov ]
});

export const ES6 = mix(ES5, {
  outDir: 'dist/'
});

export const TYPESCRIPT = mix(ES6, fileGlobs('ts'), {
  srcFiles: 'src/index.ts'
});

function fileGlobs (ext = 'js') {
  const srcFiles = `src/**/*.${ext}`;
  const testFiles = `test/**/*.${ext}`;
  return { srcFiles, testFiles };
}
