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