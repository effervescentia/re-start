import { typescript } from '../commands/build';
import dev from '../commands/dev';
import { eslint } from '../commands/lint';
import { mocha } from '../commands/test';
import tdd from '../commands/tdd';
import ci from '../commands/ci';
import { istanbul } from '../commands/coverage';
import prepush from '../commands/prepush';
import { TYPESCRIPT } from '../defaults';
import { createPreset } from '../utils';

const COMMANDS = {
  build: typescript,
  // lint: eslint,
  test: mocha,
  coverage: istanbul,
  dev,
  tdd,
  ci,
  prepush
};

export default createPreset(COMMANDS, TYPESCRIPT);
