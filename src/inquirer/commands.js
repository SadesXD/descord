const events = require("./events");

let actionSelection = [
  {
    type: "list",
    name: "action",
    message: "Choices your action: ",
    choices: [
      {
        name: "Create events",
        value: "event",
      },
      {
        name: "Create command handler",
        value: "handler",
      },
      {
        name: "Create Commands",
        value: "createCmd",
      },
      {
        name: "Complete Setup",
        value: "complete",
      },
    ],
  },
];

let createEvents = [
  {
    type: "list",
    name: "createEvent",
    message: "Choices event name: ",
    choices: Object.keys(events),
  },
];

let createCommandHandler = [
  {
    type: "list",
    name: "selectCmdHandler",
    message: "Choices type of the command handler: ",
    choices: ["Advanced", "Basic"],
  },
];

let CompleteSetup = [
  {
    type: "input",
    name: "prefix",
    message: "Your bot prefix: ",
    validate: function (answer) {
      if (answer === "") {
        return "Please give your bot prefix";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "token",
    message: "Give your bot token: ",
    validate: function (answer) {
      if (answer === "") {
        return "Please give your bot token";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "logs",
    message: "Give your channel logs id: ",
    validate: function (answer) {
      if (answer === "") {
        return "Please give your channel logs id";
      }
      return true;
    },
  },
];

let createCommands = [
  {
    type: "input",
    name: "name",
    message: "Give your command name: ",
    validate: function (answer) {
      if (answer === "") {
        return "Please give your command name";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "description",
    message: "Give your command description: ",
    default: "None",
  },
  {
    type: "input",
    name: "Usage",
    message: "Give your command usage: ",
    default: "None",
  },
  {
    type: "input",
    name: "cooldown",
    message: "Give your command cooldown: ",
    default: 3000,
  },
  {
    type: "input",
    name: "aliases",
    message: "Give your command aliases, Seperate with ( , ): ",
  },
  {
    type: "input",
    name: "permissions",
    message: "Give your command permissions, Seperate with ( , ): ",
  },
  {
    type: "input",
    name: "folder",
    message: "Give the folder/category name: ",
    validate: function (answer) {
      if (answer === "") {
        return "Give folder selection";
      }
      return true;
    },
  },
];

module.exports = {
  createCommands,
  CompleteSetup,
  createCommandHandler,
  createEvents,
  actionSelection,
};
