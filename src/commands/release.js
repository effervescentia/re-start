import release from 'start-release';
import { command, PROD_ENV } from '../utils';

export default (commands, rawOpts) =>
command((opts) => commands.start(
  PROD_ENV,
  release(opts.releaseOpts || {})
), rawOpts);
