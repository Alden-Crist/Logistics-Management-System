const express = require('express');
const adminController = require('./../controllers/adminController'); 
const router = express.Router();

router
  .route('/')
  .get(adminController.getAllAdmins) 
  .post(adminController.createAdmin)


router.route('/login').post(adminController.loginAdmin);

//  router
//   .route('/:id')
//   .get(customerController.getCustomer) 
//   .patch(customerController.updateCustomer) 
//   .delete(customerController.deleteCustomer); 

router
  .route('/:id')
  .get(adminController.getAdmin) 

module.exports = router;