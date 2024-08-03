const express = require('express');
const productController = require('./../controllers/productController'); 
const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts) 
  .post(productController.createProduct)

// router
//   .route('/:id')
// .get(warehouseController.getWarehouse) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;