/* eslint-disable no-confusing-arrow,no-ternary,no-magic-numbers */
import Start from 'start';
import env from 'start-env';
import minimist from 'minimist';
import { config } from './config'; // eslint-disable-line import/named

export const TEST_ENV = env('NODE_ENV', 'test');
export const PROD_ENV = env('NODE_ENV', 'production');
export const DEV_ENV = env('NODE_ENV', 'development');

export const rayify = (items) => Array.isArray(items) ? items : [items];

export const optify = (obj) => obj ? [obj] : [];

export const wrapCommand = (command, commands, rawOpts) => (...args) =>
  command(commands, {
    ...rawOpts,
    ...((args.length !== 0 && typeof args[0] === 'object') ? args[0] : minimist(args))
  });

export const createPreset = (commands, defaults) => {
  return (startOrOpts = {}, maybeOpts = {}) => {
    let start = null;
    let rawOpts = startOrOpts;

    if (typeof startOrOpts === 'function') {
      start = startOrOpts;
      rawOpts = maybeOpts;
    }

    const opts = {
      ...defaults,
      ...(config || {}).restart,
      ...rawOpts
    };
    const preset = { start: start || Start(opts.reporter(opts.reporterOpts)) };

    /* beautify preserve:start */
    Object.assign(preset, Object.keys(commands)
      .reduce((configured, key) =>
        Object.assign(configured, { [key]: wrapCommand(commands[key], preset, opts) }), {}));
    /* beautify preserve:end */

    return preset;
  };
};
