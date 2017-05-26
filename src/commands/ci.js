import { command } from '../utils';

export default (commands, rawOpts) =>
command((opts) => commands.start(
  commands.lint,
  commands.coverage,
  ...opts.reporters.reduce((tasks, reporter) => tasks.concat(...reporter(commands, opts)), [])
), rawOpts);
