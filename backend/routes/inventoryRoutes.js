const express = require('express');
const inventoryController = require('./../controllers/inventoryController'); 
const router = express.Router();

router
  .route('/')
  .get(inventoryController.getAllInventorys) 
  .post(inventoryController.createInventory)

router.route('/:id').patch(inventoryController.updateInventory).delete(inventoryController.deleteInventory); 
// .get(warehouseController.getWarehouse) 
//    
//   

module.exports = router;