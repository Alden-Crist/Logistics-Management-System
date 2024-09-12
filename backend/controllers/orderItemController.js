const OrderItem = require('./../models/orderItemModel');
const Order =require('./../models/orderModel');
const Product = require('./../models/productModel');
const Customer = require('./../models/customerModel');

exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll({
            include: [{ model: Order }, { model: Product },{ model: Customer }]
        });
        res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching order items:', error);
        res.status(500).json({ error: 'Failed to fetch order items' });
    }
};

exports.createOrderItem =async (req, res) => {
    try {
        const { order_id, product_id,customer_id, quantity, price } = req.body;
        const newOrderItem = await OrderItem.create({
            order_id,
            product_id,
            customer_id,
            quantity,
            price
        });
        res.status(201).json(newOrderItem);
    } catch (error) {
        console.error('Error creating order item:', error);
        res.status(500).json({ error: 'Failed to create order item' });
    }
};

exports.deleteOrderItem = async (req, res) => {
    try {
        
        const orderItem = await OrderItem.findByPk(req.params.id);

        if (!orderItem) {
            return res.status(404).json({ status: 'fail', message: 'OrderItem  not found' });
        }

        // Delete the pRODUCT
        await orderItem.destroy();

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