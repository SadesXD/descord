const { createWriteFile, createDir } = require("./advanced");
const { indexjs, jsonPackage } = require("../../template/basic/index");
const { exec } = require("child_process");

const basic = () => {
  createWriteFile("index.js", indexjs);
  createWriteFile("package.json", jsonPackage);

  createDir("Commands");

  let cmdData = `exports.run = async (client, message, args) => {
    // Your code here
  }`;

  createWriteFile("Commands/ping.js", cmdData);

  console.log("[!] install requirement package/depedencies");
  exec("npm install");
  setTimeout(() => {
    console.log("[!] Done !");
  }, 10000);
};

module.exports = basic;
