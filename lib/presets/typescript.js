import { typescript } from '../commands/build';
import dev from '../commands/dev';
import { tsMocha } from '../commands/test';
import tdd from '../commands/tdd';
import ci from '../commands/ci';
import { istanbul } from '../commands/coverage';
import prepush from '../commands/prepush';
// import release from '../commands/release';
import { TYPESCRIPT } from '../defaults';
import { createPreset } from '../utils';

const COMMANDS = {
  build: typescript,
  // lint: tslint,
  test: tsMocha,
  coverage: istanbul,
  dev,
  tdd,
  ci,
  prepush
  // release
};

export default createPreset(COMMANDS, TYPESCRIPT);
