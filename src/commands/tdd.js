import watch from 'start-watch';
import { command, rayify } from '../utils';

export default (commands, rawOpts) =>
command((opts) => commands.start(
  watch(opts.testWatchFiles || [...rayify(opts.srcFiles), ...rayify(opts.testFiles)])(commands.test)
), rawOpts);
