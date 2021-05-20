#! /usr/bin/env node

const {
  complete,
  createHandler,
  createCommands,
  createEvents,
  generate,
} = require("./yargs/commands");
const yargs = require("yargs");

yargs.command(complete);
yargs.command(createHandler);
yargs.command(createCommands);
yargs.command(createEvents);
yargs.command(generate);

yargs.parse();
