const express = require('express');
const warehouseController = require('./../controllers/warehouseController'); 
const router = express.Router();

router
  .route('/')
  .get(warehouseController.getAllWarehouses) 
  .post(warehouseController.createWarehouse)

// router
//   .route('/:id')
// .get(warehouseController.getWarehouse) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;
