const mongoose = require('mongoose');
const Product = require('../../src/models/Product');

describe('Product Model', () => {

  it('deve falhar ao criar um produto sem campos obrigatórios', async () => {
    const incompleteProduct = new Product({});

    let error;
    try {
      await incompleteProduct.validate();
    } catch (err) {
      error = err;
    }
    
    expect(error).toBeDefined();
    expect(error.errors.name).toBeTruthy();
    expect(error.errors.description).toBeTruthy();
    expect(error.errors.price).toBeTruthy();
  });

//   it('deve criar um produto corretamente com dados válidos', async () => {
//     const testData = {
//       name: 'Produto Teste',
//       description: 'Descrição do produto teste',
//       price: 10.99,
//     };
  
//     const newProduct = new Product(testData);
//     const savedProduct = await newProduct.save();
  
//     expect(savedProduct._id).toBeDefined();
//     expect(savedProduct.name).toBe(testData.name);
//     expect(savedProduct.description).toBe(testData.description);
//     expect(savedProduct.price).toBe(testData.price);
//   });

// it('deve atualizar um produto corretamente', async () => {
//     // Criar um produto inicial
//     const initialData = {
//       name: 'Produto Inicial',
//       description: 'Descrição do produto inicial',
//       price: 20.99,
//     };
//     const initialProduct = new Product(initialData);
//     const savedInitialProduct = await initialProduct.save();
  
//     // Atualizar os dados do produto
//     const updatedData = {
//       name: 'Produto Atualizado',
//       description: 'Descrição do produto atualizado',
//       price: 30.99,
//     };
  
//     // Encontrar e atualizar o produto
//     const foundProduct = await Product.findById(savedInitialProduct._id);
//     foundProduct.set(updatedData);
//     const updatedProduct = await foundProduct.save();
  
//     // Verificar se o produto foi atualizado corretamente
//     expect(updatedProduct.name).toBe(updatedData.name);
//     expect(updatedProduct.description).toBe(updatedData.description);
//     expect(updatedProduct.price).toBe(updatedData.price);
//   });

// it('deve excluir um produto corretamente', async () => {
//     // Criar um produto para excluir
//     const productToDelete = new Product({
//       name: 'Produto para Excluir',
//       description: 'Descrição do produto para excluir',
//       price: 50.99,
//     });
//     await productToDelete.save();
  
//     // Excluir o produto
//     const deletedProduct = await Product.findByIdAndDelete(productToDelete._id);
  
//     // Verificar se o produto foi excluído corretamente
//     expect(deletedProduct._id).toEqual(productToDelete._id);
//   });
  
  
});
