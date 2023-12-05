const express = require('express'),
      routes = express.Router();

const ProductController = require('./controllers/ProductController');

routes.get('/products', ProductController.index );
routes.get('/products/:id', ProductController.show );
routes.post('/products', ProductController.store );
routes.put('/products/:id', ProductController.update );
routes.delete('/products/:id', ProductController.destroy );
routes.get('/products/priceAbove/:minPrice', ProductController.findByPrice );
routes.get('/products/descriptionContains/:keyword', ProductController.findByDescription );

module.exports = routes;