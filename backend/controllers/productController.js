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




exports.updateProductQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock_quantity } = req.body;

        // Find the product by ID
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product's stock quantity
        product.stock_quantity = stock_quantity;
        await product.save();

        res.status(200).json({ message: 'Product quantity updated successfully', product });
    } catch (error) {
        console.error('Error updating product quantity:', error);
        res.status(500).json({ error: 'Failed to update product quantity' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }

        // Delete the pRODUCT
        await product.destroy();

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};