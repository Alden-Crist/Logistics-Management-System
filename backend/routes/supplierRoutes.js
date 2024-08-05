const express = require('express');
const supplierController = require('./../controllers/supplierController'); 
const router = express.Router();

router
  .route('/')
  .get(supplierController.getAllSuppliers) 
  .post(supplierController.createtSupplier)

router.route('/login').post(supplierController.loginSupplier);


//  router
//   .route('/:id')
//   .get(customerController.getCustomer) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;
