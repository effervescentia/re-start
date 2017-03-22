import files from 'start-files';
import read from 'start-read';
import startCodecov from 'start-codecov';

export default (commands, opts) => [
  files(opts.coverageReport),
  read(),
  startCodecov(opts.codecovOpts)
];
