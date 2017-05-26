/* eslint-disable no-confusing-arrow,no-ternary */
import Start from 'start';
import env from 'start-env';
import minimist from 'minimist';
import { config } from './config'; // eslint-disable-line import/named

export const TEST_ENV = env('NODE_ENV', 'test');
export const PROD_ENV = env('NODE_ENV', 'production');
export const DEV_ENV = env('NODE_ENV', 'development');

export const rayify = (items) => Array.isArray(items) ? items : [items];

export const optify = (obj) => obj ? [obj] : [];

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
        Object.assign(configured, { [key]: commands[key](preset, opts) }), {}));
    /* beautify preserve:end */

    return preset;
  };
};

export const command = (rawCommand, rawOpts) => (...args) =>
  rawCommand({ ...rawOpts, ...minimist(args) });
