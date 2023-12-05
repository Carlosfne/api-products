const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/product-api');

app.use('/api', require('./src/routes'));


// // Model do Produto
// const Product = mongoose.model('Product', {
//   name: String,
//   description: String,
//   price: Number,
// });

// // Rota para criar um novo produto
// app.post('/products', async (req, res) => {
//     try {
//       const { name, description, price } = req.body;
//       const newProduct = new Product({ name, description, price });
//       await newProduct.save();
//       res.status(201).json(newProduct);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Rota para obter todos os produtos
//   app.get('/products', async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.json(products);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Rota para obter um produto específico pelo ID
//   app.get('/products/:id', async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id);
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
//       res.json(product);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Rota para atualizar um produto pelo ID
//   app.patch('/products/:id', async (req, res) => {
//     try {
//       const { name, description, price } = req.body;
//       const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
//       if (!updatedProduct) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
//       res.json(updatedProduct);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Rota para deletar um produto pelo ID
//   app.delete('/products/:id', async (req, res) => {
//     try {
//       const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//       if (!deletedProduct) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
//       res.json({ message: 'Product deleted' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   app.get('/products/priceAbove/:minPrice', async (req, res) => {
//     try {
//       const minPrice = parseInt(req.params.minPrice);
//       const products = await Product.find({ price: { $gt: minPrice } });
//       res.json(products);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // Rota para listar produtos contendo uma palavra-chave na descrição
// app.get('/products/descriptionContains/:keyword', async (req, res) => {
//     try {
//       const keyword = req.params.keyword;
//       const products = await Product.find({ description: { $regex: keyword, $options: 'i' } });
//       res.json(products);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
