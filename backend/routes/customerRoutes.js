const express = require('express');
const customerController = require('./../controllers/customerController'); 
const router = express.Router();

router
  .route('/')
  .get(customerController.getAllCustomers) 
  .post(customerController.createCustomer)


router.route('/login').post(customerController.loginCustomer);
//  router
//   .route('/:id')
//   .get(customerController.getCustomer) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

module.exports = router;
