import restart from './tasks';
import * as presets from './presets';

module.exports = Object.assign({ restart, presets }, restart());
