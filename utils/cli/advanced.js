const fs = require("fs");
const {
  cmdHandler,
  eventHandlers,
  packageJsons,
  indexjs,
  eventsReady,
  msgEvent,
} = require("../../template/advanced/index");
const { commandData, createCommand } = require("../utils");
const { exec } = require("child_process");

let advanced = () => {
  createWriteFile("index.js", indexjs);
  createWriteFile("package.json", packageJsons);

  createDir("Handlers");
  createDir("Events");
  createDir("Commands");

  createWriteFile("Handlers/Commands.js", cmdHandler);
  createWriteFile("Handlers/Events.js", eventHandlers);
  console.log("[!] Complete setup for handlers folder");

  createWriteFile("Events/ready.js", eventsReady);
  createWriteFile("Events/message.js", msgEvent);
  console.log("[!] Complete setup for events folder");

  let dataCommands = commandData({
    name: "ping",
    description: "Show user ping",
    usage: "",
    aliases: "",
    permissions: "",
    cooldown: 3000,
  });

  createCommand({
    command_name: "ping",
    category: "other",
    data: dataCommands,
  });

  console.log("[!] install requirement package/depedencies");
  exec("npm install");
  setTimeout(() => {
    console.log("[!] Done !");
  }, 10000);
};

function createWriteFile(filename, filedata) {
  fs.open(filename, "w+", (error, fd) => {
    if (error) {
      return console.log(error);
    }

    fs.writeFileSync(fd, filedata);
  });
}

function createDir(namedir) {
  fs.mkdirSync(namedir);
  console.log("[!] Creating Directory: " + namedir);
}

module.exports = {
  createWriteFile,
  createDir,
  advanced: advanced,
};
