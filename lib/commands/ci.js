export default (commands, opts) => () => commands.start(
  commands.lint,
  commands.coverage,
  ...opts.reporters.reduce((tasks, reporter) => tasks.concat(...reporter(commands, opts)), [])
);
