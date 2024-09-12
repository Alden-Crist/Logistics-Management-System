const Supplier = require('./../models/supplierModel');


exports.getAllSuppliers =async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createtSupplier =async (req, res) => {
    try {
        const { name, contact_name, phone, email, address, password } = req.body;
        

        // Create the new supplier
        const newSupplier = await Supplier.create({
            name,
            contact_name,
            phone,
            email,
            address,
            password,
            created_at: new Date()
        });
        
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.loginSupplier = async (req, res) => {
    const { name, password } = req.body; // Assuming email is used for login
    try {
        const supplier = await Supplier.findOne({ where: { name } });
        if (supplier) {
            // Directly compare the provided password with the stored password (not recommended for production)
            if (supplier.password === password) {
                return res.status(200).json({ message: 'Login successful', supplierId: supplier.id });
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

exports.deleteSupplier = async (req, res) => {
    try {
        // Find the driver first
        const supplier = await Supplier.findByPk(req.params.id);

        if (!supplier) {
            return res.status(404).json({ status: 'fail', message: 'Supplier not found' });
        }

        // Delete the driver
        await supplier.destroy();

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