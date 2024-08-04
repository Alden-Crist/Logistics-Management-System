const express = require('express');
const adminController = require('./../controllers/adminController'); 
const router = express.Router();

router
  .route('/')
  .get(adminController.getAllAdmins) 
  .post(adminController.createAdmin)

//  router
//   .route('/:id')
//   .get(customerController.getCustomer) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;