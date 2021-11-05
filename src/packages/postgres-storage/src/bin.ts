#! /usr/bin/env node

import execa from 'execa';

const DB_PREFIX = 'db:';

const dbCommandIndex = process.argv.findIndex((command) => command.startsWith(DB_PREFIX));
const commands = process.argv.slice(dbCommandIndex);

(async () => {
  try {
    const { stdout } = await execa('npx', ['sequelize-cli', ...commands]);
    console.log(stdout);
  } catch (error) {
    console.error(error);
  }
})();
