const { clear, addProduct, addWarehouse, stock, unstock, listProducts, listWarehouse, listWarehouses } = require('../src/commands');

// ADD PRODUCT
test('valid command for ADD PRODUCT', () => {
    clear();
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    expect(addProduct.action(commandArray)).toBe(0);
})

test('adding products with same SKU same Name', () => {
    clear();
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    commandArray2 = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    addProduct.action(commandArray)
    expect(addProduct.action(commandArray2)).toBe(0);
})

test('adding products with different SKU same Name', () => {
    clear();
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '48538505-0767-453f-89af-d11c809ebb3b'];
    commandArray2 = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    addProduct.action(commandArray)
    expect(addProduct.action(commandArray2)).toBe(0);
})

test('adding products with same SKU different Name', () => {
    clear();
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    commandArray2 = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set2"', '38538505-0767-453f-89af-d11c809ebb3b'];
    addProduct.action(commandArray)
    expect(addProduct.action(commandArray2)).toBe(1);
})


// ADD WAREHOUSE
test('valid command for ADD WAREHOUSE', () => {
    clear();
    commandArray = ['ADD', 'WAREHOUSE', '970'];
    expect(addWarehouse.action(commandArray)).toBe(0);
})

test('valid command for ADD WAREHOUSE with STOCK LIMIT', () => {
    clear();
    commandArray = ['ADD', 'WAREHOUSE', '970', '1000'];
    expect(addWarehouse.action(commandArray)).toBe(0);
})

test('warehouse already exists', () => {
    clear();
    commandArray = ['ADD', 'WAREHOUSE', '970', '1000'];
    addWarehouse.action(commandArray);
    expect(addWarehouse.action(commandArray)).toBe(0);
})

test('invalid warehouse number', () => {
    clear();
    commandArray = ['ADD', 'WAREHOUSE', '97o', '1000'];
    addWarehouse.action(commandArray);
    expect(addWarehouse.action(commandArray)).toBe(1);
})

test('invalid warehouse stock limit', () => {
    clear();
    commandArray = ['ADD', 'WAREHOUSE', '970', '-1000'];
    addWarehouse.action(commandArray);
    expect(addWarehouse.action(commandArray)).toBe(1);
})

// STOCK

