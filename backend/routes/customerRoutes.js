const express = require('express');
const customerController = require('./../controllers/customerController'); 
const router = express.Router();

router
  .route('/')
  .get(customerController.getAllCustomers) 
  .post(customerController.createCustomer)


router.route('/login').post(customerController.loginCustomer);

router.route('/:id').delete(customerController.deleteCustomer);
//   .get(customerController.getCustomer) 
//   .patch(customerController.updateCustomer) 
//    

module.exports = router;
