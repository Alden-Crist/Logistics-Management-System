const Product = require('./../models/productModel');

exports.getAllProducts =async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};


exports.createProduct =  async (req, res) => {
    try {
        const { name, description, price, stock_quantity, supplier_id } = req.body;
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock_quantity,
            supplier_id
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};