import watch from 'start-watch';
import { rayify } from '../utils';

export default (commands, opts) => () => commands.start(
  watch(opts.testWatchFiles || [...rayify(opts.srcFiles), ...rayify(opts.testFiles)])(commands.test)
);
