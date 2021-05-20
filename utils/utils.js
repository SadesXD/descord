const fs = require("fs");

function eventMessage(event) {
  let params;
  if (event === null) {
    params = "client";
  } else {
    params = `client, ${event.join(", ")}`;
  }
  return `module.exports = async (${params}) => {
      // Your code here
}`;
}

function createConfigFile(data, options = true) {
  fs.open("./config.json", "w+", (error, fd) => {
    if (error) {
      return console.log(error);
    }

    let advanced = {
      prefix: data.prefix,
      logs: data.logs,
    };

    let basic = {
      prefix: data.prefix,
      logs: data.logs,
      token: data.token,
    };

    let dataConfig = options ? basic : advanced;

    fs.writeFileSync("./config.json", JSON.stringify(dataConfig, null, 2));
  });
}

function createEnvFile(data) {
  fs.open("./.env", "w+", (error, fd) => {
    if (error) {
      return console.log(error);
    }

    let dataEnv = `TOKEN=${data}`;
    fs.writeFileSync("./.env", dataEnv);
  });
}

function createCommand({ command_name, category, data }) {
  let Dirname = "./Commands" || "./commands";
  fs.access(Dirname, (error) => {
    if (error) {
      fs.mkdirSync("./Commands");
      createCommand({
        command_name: command_name,
        category: category,
        data: data,
      });
    } else {
      fs.access(`${Dirname}/${category}`, (err) => {
        if (err) {
          fs.mkdirSync(`${Dirname}/${category}`);
          createCommand({
            command_name: command_name,
            category: category,
            data: data,
          });
        } else {
          let Command_file_name = `${Dirname}/${category}/${command_name}.js`;
          fs.open(Command_file_name, "w+", (error) => {
            if (error) {
              return console.log(error);
            }
            fs.writeFileSync(Command_file_name, data);
          });
        }
      });
    }
  });
}

function commandData({ name, description, usage, aliases, permissions, cooldown }) {
  return `module.exports = {
    name: "${name}",
    description: "${description}",
    usage: "${usage}",
    aliases: [${aliases}],
    permissions: [${permissions}],
    cooldown: ${cooldown},
    run: async (client, message, args) => {
      // Your code here
    }
  }`;
}

function createEvent({ filename, data }) {
  let dirname = "./Events" || "./events";

  fs.access(dirname, (error) => {
    if (error) {
      fs.mkdirSync("./Events");
      createEvent({ filename, data });
    } else {
      fs.writeFileSync(dirname + "/" + filename + ".js", data);
    }
  });
}

module.exports = {
  eventMessage,
  createConfigFile,
  createEnvFile,
  createCommand,
  commandData,
  createEvent,
};
