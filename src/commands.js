const { isInteger, strFormatter } = require('./utils.js')

const products = {};
const warehouses = new Map();
const warehouseStocks = {};
const commands = [];

addProduct = {
    text: 'ADD PRODUCT',
    action: (commandArray) => {
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
        if ((commandArray.length > 4) || (commandArray.length < 3)) {
            console.log('Error length');
            return;
        }
        if (!isInteger(commandArray[2])) {
            console.log('Error warehouse num not an integer');
            return;
        }
        warehouseID = +commandArray[2];
        stockLimit = commandArray[3];
        if (warehouses.has(warehouseID)) {
            console.log('Error warehouse already exist')
            return;
        }
        if (stockLimit) {
            if (!isInteger(stockLimit)) {
                console.log('Error Stock limit must be integer')
                return;
            }
            warehouses.set(warehouseID, +stockLimit);
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
        if (commandArray.length !== 4) {
            console.log('Error length');
            return;
        }
        sku = commandArray[1];
        warehouseID = commandArray[2];
        quantity = commandArray[3];
        if (!(sku in products)) {
            console.log('Error sku not found');
            return;
        }
        if (!isInteger(warehouseID)) {
            console.log('Error invalid warehouse number');
            return;
        }
        if (!isInteger(quantity)) {
            console.log('Error QTY must be integer');
            return;
        }
        warehouseID = +warehouseID;
        quantity = +quantity;

        if (!(warehouses.has(warehouseID))) {
            console.log('Error warehouse not found');
            return;
        }

        // if first time stock to this warehouse number
        if (!(warehouseID in warehouseStocks)) {
            warehouseStocks[warehouseID] = {}
        }

        // check if incoming stocks exceed avaialable stock limit
        actualQTY = quantity;
        if (warehouses.get(warehouseID) !== undefined) {
            remainingSpace = warehouses.get(warehouseID);
            actualQTY = Math.min(remainingSpace, quantity)
            warehouses.set(warehouseID, warehouses.get(warehouseID) - actualQTY);
        }

        if (!warehouseStocks[warehouseID][sku]) {
            warehouseStocks[warehouseID][sku] = actualQTY;
        } else {
            warehouseStocks[warehouseID][sku] += actualQTY;
        }

    }
}
commands.push(stock);

listProducts = {
    text: 'LIST PRODUCTS',
    action: () => {
        for (let [sku, productName] of Object.entries(products)) {
            console.log(`${productName} ${sku}`);
        }
    }
}
commands.push(listProducts);

listWarehouses = {
    text: 'LIST WAREHOUSES',
    action: () => {
        for (let [warehouseID, stockLimit] of warehouses) {
            console.log(`${warehouseID}`);
        }
    }
}
commands.push(listWarehouses);

listWarehouse = {
    text: 'LIST WAREHOUSE',
    action: (commandArray) => {
        if (commandArray.length !== 3) {
            console.log('Error length');
            return;
        }
        header = strFormatter(['ITEM_NAME', 'ITEM_SKU', 'QTY'], [40, 40, 10]);
        console.log(header);
        warehouseID = commandArray[2];
        if (!isInteger(warehouseID)) {
            console.log('Error invalid warehouse number');
            return;
        }
        warehouseID = +warehouseID;
        if (!warehouses.has(warehouseID)) {
            console.log('Error warehouse number not found');
            return;
        }
        for (let [sku, qty] of Object.entries(warehouseStocks[warehouseID])) {
            row = strFormatter([`${[products[sku]]}`, `${sku}`, `${qty}`], [40, 40, 10]);
            console.log(row);
        }
    }
}
commands.push(listWarehouse);

module.exports = { commands, products, warehouses, warehouseStocks };