const express = require('express');
const fleetController = require('./../controllers/fleetController'); 
const router = express.Router();

router
  .route('/')
  .get(fleetController.getAllVehicles) 
  .post(fleetController.createFleet)


  

// router
//   .route('/:id')
// .get(warehouseController.getWarehouse) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 


module.exports = router;