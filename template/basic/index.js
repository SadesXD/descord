let index = `const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const channelLogs = config.logs;
const token = config.token;

client.on("ready", async () => {
  client.user.setActivity("Tutorial discord bot",{
    type:"WATCHING"
  })
  console.log("Bot Is Ready") 
});

client.on("message", async message => {   
  if(message.channel.type == "dm")return;
  if(message.author.bot)return;
  if(message.content === \`<@\${client.user.id}>\` || message.content === \`<@!\${client.user.id}>\`){
    message.channel.send(\`\${message.author} My Prefix is \${prefix}\`);
  }
  
  if(!message.content.startsWith(prefix))return;
   
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  if(!cmd)return;
  
  try{
    delete require.cache[require.resolve(\`./commands/\${cmd}.js\`)];
    let commandFile = require(\`./commands/\${cmd}.js\`);
    commandFile.run(client, message, args);
  }catch(e){
    console.log(e);
  }finally{
    client.channels.cache.get(channelLogs).send(\`\${message.author.tag} Using Commands: \${cmd}, In Server: \${message.guild.name}\`);
  }
});

client.login(token);
`;

let package = {
  name: "discord-bot",
  version: "0.0.1",
  description: "Discord bot command handler using javascript",
  main: "index.js",
  scripts: {
    start: "node index.js",
  },
  dependencies: {
    "discord.js": "^12.5.2",
  },
  license: "MIT",
};

let packageJson = JSON.stringify(package, null, 2);

module.exports = {
  indexjs: index,
  jsonPackage: packageJson,
};
