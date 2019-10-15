const chalk = require('chalk');

const info = (str) => (
    chalk.underline.grey(str)
)

const success = (command) => (
    `${chalk.green.inverse(' SUCCESS ')} ${command}\n`
)

const warning = (command, response) => (
    `${chalk.yellow.inverse(' WARNING ')} ${command}: ${info(response)}\n`
)

const danger = (command, response) => (
    `${chalk.red.inverse(' ERROR ')} ${command}: ${info(response)}\n`
)

const title = (str) => (
    chalk.black.bgWhite(str)
)

module.exports = { success, warning, danger, title }