const express = require('express');
const warehouseController = require('./../controllers/warehouseController'); 
const router = express.Router();

router
  .route('/')
  .get(warehouseController.getAllWarehouses) 
  .post(warehouseController.createWarehouse)

// router
//   .route('/:id')
//  
//    
//   .delete(customerController.deleteCustomer); 
router.route('/:id').get(warehouseController.getWarehouse).delete(warehouseController.deleteWarehouse).patch(warehouseController.updateWarehouse);


module.exports = router;
