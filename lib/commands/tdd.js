import files from 'start-files';
import watch from 'start-watch';

export default (commands, opts) => () => commands.start(
  files(opts.testWatchFiles),
  watch(commands.test)
);
