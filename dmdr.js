#!/usr/bin/env node

const program     = require('commander');
const path        = require('path');
const pkg         = require("./package.json");

program
  .version(pkg.version)
  .command('iconfont [command]', 'create or extract from iconfont',{cwd:process.cwd()})
  .alias('i')

program
  .parse(process.argv);