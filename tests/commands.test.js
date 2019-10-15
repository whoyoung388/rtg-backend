const { addProduct, addWarehouse, stock, unstock, listProducts, listWarehouse, listWarehouses } = require('../src/commands');

test('valid command for ADD PRODUCT', () => {
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    expect(addProduct.action(commandArray)).toBe(0);
})

test('adding products with same SKU same Name', () => {
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    commandArray2 = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    addProduct.action(commandArray)
    expect(addProduct.action(commandArray2)).toBe(0);
})

test('adding products with different SKU same Name', () => {
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '48538505-0767-453f-89af-d11c809ebb3b'];
    commandArray2 = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    addProduct.action(commandArray)
    expect(addProduct.action(commandArray2)).toBe(0);
})

test('adding products with same SKU different Name', () => {
    commandArray = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set"', '38538505-0767-453f-89af-d11c809ebb3b'];
    commandArray2 = ['ADD', 'PRODUCT', '"Sofia Vegara 5 Piece Living Room Set2"', '38538505-0767-453f-89af-d11c809ebb3b'];
    addProduct.action(commandArray)
    expect(addProduct.action(commandArray2)).toBe(1);
})

