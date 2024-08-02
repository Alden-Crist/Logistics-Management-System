const express = require('express');
const fleetController = require('./../controllers/fleetController'); 
const router = express.Router();

router
  .route('/')
  .get(fleetController.getAllVehicles) 
  .post(fleetController.createFleet)

module.exports = router;