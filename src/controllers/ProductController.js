const Product = require('../models/Product');

module.exports = {
  async index( req, res ) {
    try {
          const products = await Product.find();
          res.json(products);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
  },

  async show(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  },

  async store( req, res ) {
    try {
      const { name, description, price } = req.body;
      const newProduct = new Product({ name, description, price });
      const validationResult = newProduct.validateSync();
  
      if (validationResult) {
        const errors = Object.keys(validationResult.errors).map(key => ({
          field: key,
          message: validationResult.errors[key].message,
        }));
        return res.status(400).json({ errors });
      }
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update( req, res ) {
    try {
      const { name, description, price } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async destroy( req, res ) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async findByPrice(req, res) {
    try {
      const minPrice = parseInt(req.params.minPrice);
      const products = await Product.find({ price: { $gt: minPrice } });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  async findByDescription(req, res) {
    try {
      const keyword = req.params.keyword;
      const products = await Product.find({ description: { $regex: keyword, $options: 'i' } });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
}