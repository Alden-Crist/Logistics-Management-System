const express = require('express');
const orderController = require('./../controllers/orderController'); 
const router = express.Router();

router
  .route('/')
  .get(orderController.getAllOrders) 
  .post(orderController.createOrder)

// router
//   .route('/:id')
// .get(warehouseController.getWarehouse) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;