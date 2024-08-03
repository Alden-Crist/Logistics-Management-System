const Order = require('./../models/orderModel');
const Customer = require('./../models/customerModel');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: Customer }]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

exports.createOrder =async (req, res) => {
    try {
        const { customer_id, order_date, status, total_amount } = req.body;
        const newOrder = await Order.create({
            customer_id,
            order_date,
            status,
            total_amount
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};