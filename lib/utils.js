import Start from 'start';
import env from 'start-env';
import { config } from './config';

export const TEST_ENV = env('NODE_ENV', 'test');
export const PROD_ENV = env('NODE_ENV', 'production');
export const DEV_ENV = env('NODE_ENV', 'development');

export const rayify = (items) => Array.isArray(items) ? items : [items];

export const mix = (obj, overrides) => Object.assign({}, obj, overrides);

export const createPreset = (commands, defaults) => {
  return (startOrOpts = {}, maybeOpts = {}) => {
    let start;
    let rawOpts = startOrOpts;
    if (typeof startOrOpts === 'function') {
      start = startOrOpts;
      rawOpts = maybeOpts;
    }

    const opts = mix(defaults, (config || {}).restart, rawOpts);
    const preset = {};

    preset.start = start || Start(opts.reporter(opts.reporterOpts));

    Object.assign(preset, Object.keys(commands)
      .reduce((configured, key) => Object.assign(configured, { [key]: commands[key](preset, opts) }), {}));

    return preset;
  };
};
