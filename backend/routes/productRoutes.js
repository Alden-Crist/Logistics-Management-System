const express = require('express');
const productController = require('./../controllers/productController'); 
const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts) 
  .post(productController.createProduct)

router.route('/:id').patch(productController.updateProductQuantity).delete(productController.deleteProduct); 
// .get(warehouseController.getWarehouse) 
//   
//   

module.exports = router;