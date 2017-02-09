export default (commands) => () => commands.start(
  commands.lint,
  commands.coverage
);
