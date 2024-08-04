const Admin = require('./../models/adminModel');

exports.getAllAdmins =  async (req, res) => {
    try {
      const admins = await Admin.findAll();
      res.status(200).json(admins);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
  