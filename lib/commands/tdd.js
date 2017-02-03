import files from 'start-files';
import watch from 'start-watch';
import { rayify } from '../utils';

export default (commands, opts) => () => commands.start(
  files(opts.testWatchFiles || [ ...rayify(opts.srcFiles), ...rayify(opts.testFiles) ]),
  watch(commands.test)
);
