const {
  createCommandHandler,
  createCommands,
  createEvents,
  CompleteSetup,
  actionSelection,
} = require("./commands");
const {
  createEnvFile,
  createConfigFile,
  createCommand,
  commandData,
  createEvent,
} = require("../../utils/utils");
const { prompt } = require("inquirer");
const fs = require("fs");
const events = require("./events");
const { advanced } = require("../../utils/cli/advanced");
const basic = require("../../utils/cli/basic");

module.exports = () => {
  prompt(actionSelection).then((response) => {
    if (response.action === "event") {
      prompt(createEvents).then((event) => {
        let Data = events[event.createEvent];

        createEvent({
          filename: event.createEvent,
          data: Data,
        });
      });
    } else if (response.action === "handler") {
      prompt(createCommandHandler).then((handler) => {
        if (handler.selectCmdHandler === "Basic") {
          prompt(CompleteSetup).then((setup) => {
            basic();
            createConfigFile(setup);
          });
        } else if (handler.selectCmdHandler === "Advanced") {
          prompt(CompleteSetup).then((setup) => {
            advanced();
            createConfigFile(setup, false);
            createEnvFile(setup.token);
          });
        }
      });
    } else if (response.action === "createCmd") {
      prompt(createCommands).then((command) => {
        let alias_ = command.aliases.split(",").map((alias) => '"' + alias.trim() + '"');
        let perms_ = command.permissions.split(",").map((perms) => '"' + perms.trim() + '"');

        let cmd_data = commandData({
          name: command.name,
          description: command.description,
          usage: command.Usage,
          permissions: perms_,
          aliases: alias_,
          cooldown: command.cooldown,
        });

        createCommand({
          command_name: command.name,
          category: command.folder,
          data: cmd_data,
        });
      });
    } else if (response.action === "complete") {
      prompt(CompleteSetup).then((setup) => {
        advanced();
        createConfigFile(setup, false);
        createEnvFile(setup.token);
      });
    }
  });
};
