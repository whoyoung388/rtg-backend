const { isInteger } = require('./utils.js')

const products = {};
const warehouses = new Map();
const commands = [];

addProduct = {
    text: 'ADD PRODUCT',
    action: (commandArray) => {
        console.log(commandArray);
        if (commandArray.length !== 4) {
            console.log('Error length');
            return;
        }
        productName = commandArray[2].replace(/"/g, "");
        sku = commandArray[3];
        if ((sku in products) && (products[sku] !== productName)) {
            console.log('Error duplicate sku');
            return;
        }
        products[sku] = productName;
        console.log('success!');
        return;
    }
}
commands.push(addProduct);

addWarehouse = {
    text: 'ADD WAREHOUSE',
    action: (commandArray) => {
        console.log('CASE: add warehouse');
        console.log(commandArray);
        if ((commandArray.length > 4) || (commandArray.length < 3)) {
            console.log('Error length');
            return;
        }
        if (!isInteger(commandArray[2])) {
            console.log('Error warehouse num not an integer');
            return;
        }
        warehouseID = +commandArray[2];
        if (warehouses.has(warehouseID)) {
            console.log('Error warehouse already exist')
            return;
        }
        if (commandArray[3]) {
            if (!isInteger(commandArray[3])) {
                console.log('Error Stock limit must be integer')
                return;
            }
            warehouses.set(warehouseID, +commandArray[3])
        } else {
            warehouses.set(warehouseID, undefined)
        }
        console.log('success!');
        return;
    }
}
commands.push(addWarehouse);

stock = {
    text: 'STOCK',
    action: (commandArray) => {
        console.log('CASE: stock');
        if (commandArray.length !== 4) {
            console.log('Error length');
            return;
        }
        sku = commandArray[1];
        warehouseID = commandArray[2];
        quantity = commandArray[3];
        console.log(sku);
        console.log(warehouseID);
        console.log(quantity);
        if (!(sku in products)) {
            console.log('Error sku not found');
            return;
        }
        if (!isNumber(warehouseID)) {
            console.log('Error invalid warehouse number');
            return;
        }
    }
}
commands.push(stock);

listProducts = {
    text: 'LIST PRODUCTS',
    action: () => {
        console.log('CASE: list products');
        for (let [sku, productName] of Object.entries(products)) {
            console.log(`${productName} ${sku}`);
        }
    }
}
commands.push(listProducts);

listWarehouses = {
    text: 'LIST WAREHOUSES',
    action: () => {
        console.log('WAREHOUSES');
        for (let [warehouseID, stockLimit] of warehouses) {
            console.log(`${warehouseID}`);
        }
    }
}
commands.push(listWarehouses);

listWarehouse = {

}

module.exports = {commands, products, warehouses};