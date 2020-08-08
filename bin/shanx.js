#!/usr/bin/env node
const cmd = require('commander');
const { version } = require('../package.json');
const init = require('../lib/init');
cmd.version(version);

cmd
  .command('init <name>')
  .description('init project')
  .action((name) => init(name));

cmd.parse(process.argv);
