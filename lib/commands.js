import build from './commands/build';
import testBuild from './commands/test-build';
import dev from './commands/dev';
import lint, { tslint } from './commands/lint';
import test from './commands/test';
import tdd from './commands/tdd';
import ci from './commands/ci';
import coverage from './commands/coverage';
import prepush from './commands/prepush';
import release from './commands/release';

export const ES5 = {
  lint,
  test,
  coverage,
  ci,
  tdd,
  prepush,
  release
};

export const ES6 = {
  ...ES5,
  ...{
    build,
    dev
  }
};

export const TYPESCRIPT = {
  ...ES6,
  ...{
    testBuild,
    lint: tslint
  }
};
