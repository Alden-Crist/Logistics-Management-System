const express = require('express');
const transportLogController = require('./../controllers/transportLogController'); 
const router = express.Router();

router
  .route('/')
  .get(transportLogController.getAllTransportLogs) 
  .post(transportLogController.createTransportLog)

// router
//   .route('/:id')
// .get(transportLogController.getWarehouse) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;