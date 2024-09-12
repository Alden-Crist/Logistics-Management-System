const express = require('express');
const orderItemController = require('./../controllers/orderItemController'); 
const router = express.Router();

router
  .route('/')
  .get(orderItemController.getAllOrderItems) 
  .post(orderItemController.createOrderItem)

router.route('/:id').delete(orderItemController.deleteOrderItem); 
// .get(warehouseController.getWarehouse) 
//   .patch(customerController.updateCustomer) 
//   

module.exports = router;