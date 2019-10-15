const { isInteger, strFormatter } = require('./utils')
const { success, warning, danger, title } = require('./highlights')

const products = {};
const warehouses = new Map();
const warehouseStocks = {};
const commands = [];
const log = console.log;

addProduct = {
    text: 'ADD PRODUCT',
    action: (commandArray) => {
        if (commandArray.length !== 4) {
            log(danger(addProduct.text, 'INALID NUMBER OF ARGUMENTS'));
            return 1;
        }
        productName = commandArray[2].replace(/"/g, "");
        sku = commandArray[3];
        if ((sku in products) && (products[sku] !== productName)) {
            log(danger(addProduct.text, `PRODUCT WITH SKU ${sku} ALREADY EXISTS`));
            return 1;
        }
        products[sku] = productName;
        log(success(addProduct.text));
        return 0;
    }
}
commands.push(addProduct);

addWarehouse = {
    text: 'ADD WAREHOUSE',
    action: (commandArray) => {
        if ((commandArray.length > 4) || (commandArray.length < 3)) {
            log(danger(addWarehouse.text, 'INALID NUMBER OF ARGUMENTS'));
            return;
        }
        if (!isInteger(commandArray[2])) {
            log(danger(addWarehouse.text, 'WAREHOUSE NUMBER MUST BE AN INTEGER'))
            return;
        }
        warehouseID = +commandArray[2];
        stockLimit = commandArray[3];
        if (warehouses.has(warehouseID)) {
            log(warning(addWarehouse.text, 'WAREHOUSE ALREADY EXISTS'))
            return;
        }
        if (stockLimit) {
            if (!isInteger(stockLimit)) {
                log(danger(addWarehouse.text, 'STOCK LIMIT MUST BE AN INTEGER'))
                return;
            }
            warehouses.set(warehouseID, +stockLimit);
        } else {
            warehouses.set(warehouseID, undefined)
        }
        log(success(addWarehouse.text));
        return;
    }
}
commands.push(addWarehouse);

stock = {
    text: 'STOCK',
    action: (commandArray) => {
        if (commandArray.length !== 4) {
            log(danger(stock.text, 'INALID NUMBER OF ARGUMENTS'));
            return;
        }
        sku = commandArray[1];
        warehouseID = commandArray[2];
        quantity = commandArray[3];
        if (!(sku in products)) {
            log(danger(stock.text, 'SKU IS NOT IN PRODUCT CATELOG'))
            return;
        }
        if (!isInteger(warehouseID)) {
            log(danger(stock.text, 'WAREHOUSE NUMBER MUST BE AN INTEGER'))
            return;
        }
        if (!isInteger(quantity)) {
            log(danger(stock.text, 'QUANTITY NUMBER MUST BE AN INTEGER'))
            return;
        }
        warehouseID = +warehouseID;
        quantity = +quantity;

        if (!(warehouses.has(warehouseID))) {
            log(danger(stock.text, 'WAREHOUSE NUMBER NOT FOUND'))
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
        if (actualQTY !== quantity) {
            log(warning(stock.text, 
                `SHIPMENT QTY: ${quantity}, WAREHOUSE REMAINING SPACE: ${remainingSpace} ACTUAL SHIPPED QTY: ${actualQTY}`
                ));
        } else {
            log(success(stock.text));
        }

        if (!warehouseStocks[warehouseID][sku]) {
            warehouseStocks[warehouseID][sku] = actualQTY;
        } else {
            warehouseStocks[warehouseID][sku] += actualQTY;
        }
    }
}
commands.push(stock);

unstock = {
    text: 'UNSTOCK',
    action: (commandArray) => {
        if (commandArray.length !== 4) {
            log(danger(unstock.text, 'INALID NUMBER OF ARGUMENTS'));
            return;
        }
        sku = commandArray[1];
        warehouseID = commandArray[2];
        quantity = commandArray[3];
        if (!(sku in products)) {
            log(danger(unstock.text, 'SKU IS NOT IN PRODUCT CATELOG'))
            return;
        }
        if (!isInteger(warehouseID)) {
            log(danger(unstock.text, 'WAREHOUSE NUMBER MUST BE AN INTEGER'))
            return;
        }
        if (!isInteger(quantity)) {
            log(danger(unstock.text, 'QUANTITY NUMBER MUST BE AN INTEGER'))
            return;
        }
        warehouseID = +warehouseID;
        quantity = +quantity;

        if (!(warehouses.has(warehouseID))) {
            log(danger(unstock.text, 'WAREHOUSE NUMBER NOT FOUND'));
            return;
        }

        // if the warehouse is empty or doesn't contain SKU
        if (!(warehouseID in warehouseStocks) || !(sku in warehouseStocks[warehouseID])) {
            log(warning(unstock.text, 'PRODUCT NOT FOUND IN THIS WAREHOUSE'));
            return;
        }

        // check if unstock amount > current available amount
        actualQTY = Math.min(quantity, warehouseStocks[warehouseID][sku]);
        warehouseStocks[warehouseID][sku] -= actualQTY;
        if (warehouses.get(warehouseID) !== undefined) {
            warehouses.set(warehouseID, warehouses.get(warehouseID) + actualQTY);
        }
        if (actualQTY !== quantity) {
            log(warning(unstock.text, `INTEND TO SHIP ${quantity} OF PRODUCT, ONLY SHIPPED ${actualQTY}`));
        } else {
            log(success(unstock.text));
        }

        // clean up warehouseStocks if QTY of an item is 0
        if (warehouseStocks[warehouseID][sku] === 0) {
            delete warehouseStocks[warehouseID][sku];
        }
    }
}
commands.push(unstock);

listProducts = {
    text: 'LIST PRODUCTS',
    action: () => {
        header = strFormatter(['ITEM_NAME', 'ITEM_SKU'], [40, 40])
        log(title(header));
        for (let [sku, productName] of Object.entries(products)) {
            row = strFormatter([`${productName}`, `${sku}`], [40, 40])
            log(row);
        }
        log();
    }
}
commands.push(listProducts);

listWarehouses = {
    text: 'LIST WAREHOUSES',
    action: () => {
        header = strFormatter(['WAREHOUSE #', 'STOCK LIMIT'], [15, 12]);
        log(title(header));
        for (let [warehouseID, stockLimit] of warehouses) {
            if (stockLimit === undefined) {
                stockLimit = 'Infinity';
            }
            row = strFormatter([`${warehouseID}`, `${stockLimit}`], [15, 12]);
            log(row);
        }
        log();
    }
}
commands.push(listWarehouses);

listWarehouse = {
    text: 'LIST WAREHOUSE',
    action: (commandArray) => {
        if (commandArray.length !== 3) {
            log(danger(listWarehouse.text, 'INALID NUMBER OF ARGUMENTS'));
            return;
        }
        warehouseID = commandArray[2];
        if (!isInteger(warehouseID)) {
            log(danger(listWarehouse.text, 'QUANTITY NUMBER MUST BE AN INTEGER'))
            return;
        }
        warehouseID = +warehouseID;
        if (!warehouses.has(warehouseID)) {
            log(danger(listWarehouse.text, 'WAREHOUSE NUMBER NOT FOUND'));
            return;
        }
        if (!(warehouseID in warehouseStocks)) {
            warehouseStocks[warehouseID] = {}
        }
        header = strFormatter(['ITEM_NAME', 'ITEM_SKU', 'QTY'], [40, 30, 10]);
        log(title(header));
        for (let [sku, qty] of Object.entries(warehouseStocks[warehouseID])) {
            row = strFormatter([`${[products[sku]]}`, `${sku}`, `${qty}`], [40, 30, 10]);
            log(row);
        }
        log();
    }
}
commands.push(listWarehouse);

module.exports = { commands, products, warehouses, warehouseStocks, addProduct, addWarehouse, stock, unstock, listProducts, listWarehouse, listWarehouses };