const Customer = require('./../models/customerModel');

exports.getAllCustomers= async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'An error occurred while fetching customers.' });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;

        // Ensure password is provided
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Create a new customer record
        const newCustomer = await Customer.create({
            name,
            email,
            phone,
            address,
            password
        });

        return res.status(201).json(newCustomer);
    } catch (err) {
        console.error('Error creating customer:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};