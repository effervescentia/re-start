import fs from 'fs';

// eslint-disable-next-line immutable/no-mutation, no-sync
module.exports = JSON.parse(fs.readFileSync('./package.json'));
