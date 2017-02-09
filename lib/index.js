import restart from './tasks';
import * as presets from './presets';

// eslint-disable-next-line immutable/no-mutation
module.exports = Object.assign({ restart, presets }, restart());
