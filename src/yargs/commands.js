const inquirer = require("../inquirer/cli");
const events = require("../inquirer/events");
const {
  createEvent,
  createConfigFile,
  createEnvFile,
  createCommand,
  commandData,
} = require("../../utils/utils");
const { advanced } = require("../../utils/cli/advanced");
const basic = require("../../utils/cli/basic");

let generate = {
  command: "generate",
  describe: "Generate a discord bot project, with manual setup",
  handler: (args) => {
    inquirer();
  },
};

let createEvents = {
  command: "createEvent",
  describe: "Create an event",
  builder: {
    name: {
      alias: "n",
      demandOption: true,
      type: "string",
      describe: "Names of the events",
    },
  },
  handler: (args) => {
    let event_list = Object.keys(events);
    let point = 0;
    event_list.forEach((event_) => {
      if (event_.toLowerCase() === args.name.toLowerCase()) point++;
    });
    if (point === 0) {
      return console.log("[!] Event is not listed");
    }

    let result = {};
    for (let i = 0; i < event_list.length; i++) {
      result[event_list[i].toLowerCase()] = event_list[i];
    }

    let file_name = result[args.name.toLowerCase()];
    createEvent({
      filename: file_name,
      data: events[file_name],
    });
  },
};

let createCommands = {
  command: "createCommand",
  describe: "Create some command",
  builder: {
    name: {
      alias: "n",
      demandOption: true,
      type: "string",
      describe: "Names of the commands",
    },
    description: {
      alias: "d",
      demandOption: false,
      type: "string",
      describe: "Description of the command",
    },
    usage: {
      alias: "u",
      demandOption: false,
      type: "string",
      describe: "Command usage description",
    },
    aliases: {
      alias: "a",
      demandOption: false,
      type: "array",
      describe: "List of the aliases",
    },
    permissions: {
      alias: "p",
      demandOption: false,
      type: "array",
      describe: "List of the permissions",
    },
    cooldown: {
      alias: "c",
      demandOption: false,
      type: "number",
      describe: "Cooldown of the command",
    },
    category: {
      alias: "f",
      demandOption: true,
      type: "string",
      describe: "Category of the command",
    },
  },
  handler: (args) => {
    let alias_ = args.aliases ? args.aliases.map((alias) => '"' + alias.trim() + '"') : "";
    let perms_ = args.permissions ? args.permissions.map((perms) => '"' + perms.trim() + '"') : "";

    let Data = {
      name: args.name,
      description: args.description || "None",
      usage: args.usage || "None",
      aliases: alias_,
      permissions: perms_,
      cooldown: args.cooldown || 3000,
    };

    let data_command = commandData(Data);
    createCommand({
      command_name: args.name,
      category: args.category,
      data: data_command,
    });
  },
};

let createHandler = {
  command: "createHandler",
  describe: "Create a command handler",
  builder: {
    handler: {
      alias: "h",
      type: "string",
      demandOption: true,
      describe: "Type of handler",
    },
    token: {
      alias: "t",
      type: "string",
      demandOption: true,
      describe: "Bot token",
    },
    prefix: {
      alias: "p",
      type: "string",
      demandOption: true,
      describe: "Bot prefix",
    },
    logs: {
      alias: "l",
      type: "string",
      demandOption: true,
      describe: "Channel logs id",
    },
  },
  handler: (args) => {
    let point = 0;
    ["advanced", "basic"].forEach((type) => {
      if (type === args.handler.toLowerCase()) point++;
    });
    if (point === 0) {
      return console.log("[!] Type of handler is not listed");
    }

    if (args.handler.toLowerCase() === "advanced") {
      advanced();
      createConfigFile(args, false);
      createEnvFile(args.token);
    } else if (args.handler.toLowerCase() === "basic") {
      basic();
      createConfigFile(args);
    }
  },
};

let complete = {
  command: "completeSetup",
  describe: "Complete setup",
  builder: {
    token: {
      alias: "t",
      type: "string",
      demandOption: true,
      describe: "Bot token",
    },
    prefix: {
      alias: "p",
      type: "string",
      demandOption: true,
      describe: "Bot prefix",
    },
    logs: {
      alias: "l",
      type: "string",
      demandOption: true,
      describe: "Channel logs id",
    },
  },
  handler: (args) => {
    advanced();
    createConfigFile(args, false);
    createEnvFile(args.token);
  },
};

module.exports = {
  complete,
  createHandler,
  createCommands,
  createEvents,
  generate,
};
