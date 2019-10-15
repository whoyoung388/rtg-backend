const readline = require("readline");
const { commands } = require("./commands");
const { danger } = require("./highlights");
const { parser } = require("./utils");

const log = console.log;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

const isValidInput = input => {
  let act;
  commands.some(command => {
    return input.startsWith(command.text) && (act = command.action);
  });
  return act;
};

rl.prompt();
rl.on("line", input => {
  command = isValidInput(input);
  if (command !== undefined) {
    parsedArray = parser(input);
    command(parsedArray);
  } else {
    log(danger(input, "INVALID COMMAND"));
  }
  rl.prompt();
}).on("close", () => {
  log();
  log("Good bye.");
  process.exit(0);
});
