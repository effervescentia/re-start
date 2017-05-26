import watch from 'start-watch';
import inputConnector from 'start-input-connector';
import { rayify } from '../utils';

export default (commands, opts) =>
commands.start(
  watch(opts.testWatchFiles || [...rayify(opts.srcFiles), ...rayify(opts.testFiles)])(() =>
    commands.start(
      inputConnector(opts),
      commands.test
    ))
);
