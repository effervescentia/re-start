import { babel } from '../commands/build';
import dev from '../commands/dev';
import { eslint } from '../commands/lint';
import { mocha } from '../commands/test';
import tdd from '../commands/tdd';
import ci from '../commands/ci';
import { istanbul } from '../commands/coverage';
import prepush from '../commands/prepush';
// import release from '../commands/release';
import { ES6 } from '../defaults';
import { createPreset } from '../utils';

const COMMANDS = {
  build: babel,
  lint: eslint,
  test: mocha,
  coverage: istanbul,
  dev,
  tdd,
  ci,
  prepush
  // release
};

export default createPreset(COMMANDS, ES6);
