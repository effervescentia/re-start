import * as presets from './presets';

// eslint-disable-next-line immutable/no-mutation
module.exports = Object.assign({ restart: presets.es6, presets }, presets.es6());
