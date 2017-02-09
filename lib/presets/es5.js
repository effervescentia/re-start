import { eslint } from '../commands/lint';
import { mocha } from '../commands/test';
import tdd from '../commands/tdd';
import ci from '../commands/ci';
import { istanbul } from '../commands/coverage';
import prepush from '../commands/prepush';
import { ES5 } from '../defaults';
import { createPreset } from '../utils';

const COMMANDS = {
  lint: eslint,
  test: mocha,
  coverage: istanbul,
  ci,
  tdd,
  prepush
};

export default createPreset(COMMANDS, ES5);
