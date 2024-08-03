const express = require('express');
const inventoryController = require('./../controllers/inventoryController'); 
const router = express.Router();

router
  .route('/')
  .get(inventoryController.getAllInventorys) 
  .post(inventoryController.createInventory)

// router
//   .route('/:id')
// .get(warehouseController.getWarehouse) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;