const express = require('express');
const router = express.Router();
const Product = require("../models/productSchema")
const productController = require('../controllers/productController');
const upload = require('../middleware/upload')
const uploadGallery = require("../middleware/uploadGallery");
// POST /api/products


router.post('/', upload.single('thumbnail'), productController.createProduct);


// GET /api/products
router.get('/list', productController.getAllProducts);

// GET /api/products/:id
router.get('/:id', productController.getProductById);

// PUT /api/products/:id
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

router.get('/category/:categorySlug', productController.getProductsByCategorySlug);

router.get('/' , productController.getProductsByPriority);

router.patch("/update-priorities", productController.updateProductPriorities);


router.post(
  "/products/:id/gallery",
  uploadGallery.array("media", 10), // 'media' is the name of form field
  productController.uploadProductGallery
);

module.exports = router;
