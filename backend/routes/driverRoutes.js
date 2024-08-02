const express = require('express');
const driverController = require('./../controllers/driverController'); 
const router = express.Router();

router
  .route('/')
  .get(driverController.getAllDrivers) 
  .post(driverController.createDriver)

//  router
//   .route('/:id')
//   .get(customerController.getCustomer) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;