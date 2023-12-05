const ProductController = require('../../src/controllers/ProductController');
const Product = require('../../src/models/Product');

jest.mock('../../src/models/Product');

describe('ProductController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('index', () => {
    it('deve retornar uma lista de produtos', async () => {
      const productsMock = [{ name: 'Produto 1' }, { name: 'Produto 2' }];

      Product.find.mockResolvedValue(productsMock);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await ProductController.index(req, res);

      expect(res.json).toHaveBeenCalledWith(productsMock);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('deve retornar um erro em caso de falha', async () => {
      const errorMessage = 'Erro ao buscar produtos';

      Product.find.mockRejectedValue(new Error(errorMessage));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await ProductController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('deve criar um novo produto', async () => {
      const req = {
        body: {
          name: 'Novo Produto',
          description: 'Descrição do novo produto',
          price: 15.99,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    
      await ProductController.store(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    
      const createdProduct = req.body;
      expect(createdProduct.name).toBe(req.body.name);
      expect(createdProduct.description).toBe(req.body.description);
      expect(createdProduct.price).toBe(req.body.price);
    });    

    it('deve atualizar um produto existente', async () => {
      const productId = '656d012c43a557d0e7c13576';
      const req = {
          params: { id: productId },
          body: {
            name: 'Produto Atualizado',
            description: 'Descrição do produto atualizado',
            price: 25.99,
          },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
              
        jest.spyOn(Product, 'findById').mockResolvedValueOnce({ _id: productId });
      
        await ProductController.update(req, res);
      
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      
        const updatedProduct = res.body;
        expect(updatedProduct.name).toBe(req.body.name);
        expect(updatedProduct.description).toBe(req.body.description);
        expect(updatedProduct.price).toBe(req.body.price);
    });
  
    it('deve excluir um produto existente', async () => {
      const productId = '656d012c43a557d0e7c13576';
      const req = {
          params: { id: productId },
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
      
        jest.spyOn(Product, 'findByIdAndDelete').mockResolvedValueOnce({ _id: productId });
      
        await ProductController.destroy(req, res);
      
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted' });
    });
  });

  

});
