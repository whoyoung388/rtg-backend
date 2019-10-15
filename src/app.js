const readline = require('readline');
const { commands } = require('./commands.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

const isValidInput = (input) => {
    let act;
    commands.some((command) => {
        return (input.startsWith(command.text) && (act = command.action));
    })
    return act;
}

rl.prompt();

rl.on('line', (input) => {
    command = isValidInput(input);
    if (command !== undefined) {
        command(input.match(/[^" ]+|"[^"]+"/g));
    } else {
        console.log('Invalid input!')
    }
    rl.prompt();
}).on('close', () => {
    console.log();
    console.log('Good bye.');
    process.exit(0);
});
