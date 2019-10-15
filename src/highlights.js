const chalk = require("chalk");

const info = str => chalk.underline.hex("#AEC9D6")(str);

const success = command => `${chalk.green.bold(" SUCCESS ")} ${command}\n`;

const warning = (command, response) =>
  `${chalk.yellow.bold(" WARNING ")} ${command}: ${info(response)}\n`;

const danger = (command, response) =>
  `${chalk.red.bold(" ERROR ")} ${command}: ${info(response)}\n`;

const title = str => chalk.grey.bgWhite(str);

module.exports = { success, warning, danger, title };
