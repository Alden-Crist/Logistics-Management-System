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

        
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

       
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


exports.loginCustomer = async (req, res) => {
    const { name, password } = req.body;
    console.log('Received Name:', name);  // Log the name received from the request
    try {
        const customer = await Customer.findOne({ where: { name } });
        console.log('Customer Found:', customer);  // Log the customer object found
        
        if (customer) {
            if (customer.password === password) {
                return res.status(200).json({ message: 'Login successful', customerId: customer.id });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        // Find the driver first
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({ status: 'fail', message: 'Customer not found' });
        }

        // Delete the driver
        await customer.destroy();

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