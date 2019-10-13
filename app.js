const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});


const products = new Set();
const warehouses = {};

const actions = {
    'ADD': function() {
        console.log('ADD');
    },
    'LIST': function() {
        console.log('LIST');
    },
    'STOCK': function() {
        console.log('stock');
    },
    'UNSTOCK': function() {
        console.log('unstock');
    }
}

rl.prompt();

rl.on('line', (cmd) => {
    inputs = cmd.match(/\w+|"[^"]+"/g);
    console.log(inputs[0]);
    console.log(inputs[1]);
    console.log(inputs[2]);
}).on('close', () => {
    console.log('Good bye.');
    process.exit(0);
});