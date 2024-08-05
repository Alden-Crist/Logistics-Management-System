const Admin = require('./../models/adminModel');

exports.getAllAdmins =  async (req, res) => {
    try {
      const admins = await Admin.findAll();
      res.status(200).json(admins);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        
        if (!admin) {
            return res.status(404).json({
                status: 'fail',
                message: 'Admin not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                admin,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

exports.createAdmin =async (req, res) => {
    try {
      const { name, password, gmail } = req.body;
      const newAdmin = await Admin.create({ name, password, gmail });
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.loginAdmin = async (req, res) => {
    const { name, password } = req.body; // Assuming email is used for login
    try {
        const admin = await Admin.findOne({ where: { name } });
        if (admin) {
            // Directly compare the provided password with the stored password (not recommended for production)
            if (admin.password === password) {
                return res.status(200).json({ message: 'Login successful', adminId: admin.id });
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