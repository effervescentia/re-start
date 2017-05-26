import inputConnector from 'start-input-connector';

export default (commands, opts) =>
commands.start(
  inputConnector(opts),
  commands.lint,
  inputConnector(opts),
  commands.coverage,
  ...opts.reporters.reduce((tasks, reporter) => tasks.concat(...reporter(commands, opts)), [])
);
