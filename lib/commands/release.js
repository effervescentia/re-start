import release from 'start-release';
import { PROD_ENV } from '../utils';

export default (commands, opts) => () => commands.start(
  PROD_ENV,
  release(opts.releaseOpts || {})
);
