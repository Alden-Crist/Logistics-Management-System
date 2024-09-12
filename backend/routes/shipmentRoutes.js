const express = require('express');
const shipmentController = require('./../controllers/shipmentController'); 
const router = express.Router();

router
  .route('/')
  .get(shipmentController.getAllShipments) 
  .post(shipmentController.createShipment)

router.route('/:id').delete(shipmentController.deleteShipment); 
// .get(warehouseController.getWarehouse) 
//   .patch(customerController.updateCustomer) 


module.exports = router;