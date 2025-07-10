const Product = require("../models/productSchema");

exports.createProduct = async (req, res) => {
  try {
    const {
      productCode,
      name,
      slug,
      brand,
      category,
      subCategory,
      categorySlug,
      barcode,
      mrp,
      defaultSellingPrice,
      gstRate,
      packingType,
      flavor,
      shelfLife,
      storageInstructions,
      description,
      minOrderQty,
      maxOrderQty,
      tags,
      keywords,
      highlights,
      // displaySettings
      // seo
    } = req.body;

    // Manually parse nested fields
    const discounts = req.body.discounts
      ? JSON.parse(req.body.discounts)
      : undefined;
    const nutritionFacts = req.body.nutritionFacts
      ? JSON.parse(req.body.nutritionFacts)
      : undefined;
    const netWeight = req.body.netWeight
      ? JSON.parse(req.body.netWeight)
      : {
          value: req.body.netWeightValue
            ? parseFloat(req.body.netWeightValue)
            : 0,
          unit: req.body.netWeightUnit || "g",
        };
    const seo = req.body.seo
      ? JSON.parse(req.body.seo)
      : {
          title: req.body.title ? parseFloat(req.body.title) : "",
          metaDescription: req.body.metaDescription || "",
        };
    // displaySettings
    const displaySettings = req.body.displaySettings
      ? JSON.parse(req.body.displaySettings)
      : {
          priority: req.body.priority ? parseFloat(req.body.priority) : "",
          homeSection: req.body.homeSection || "",
          showOnHome: req.body.showOnHome || false,
        };
    // Thumbnail
    const thumbnail = req.file ? req.file.path : null;

    const newProduct = new Product({
      productCode,
      name,
      slug,
      brand,
      category,
      subCategory,
      categorySlug,
      barcode,
      mrp,
      defaultSellingPrice,
      gstRate,
      packingType,
      flavor,
      shelfLife,
      storageInstructions,
      description,
      minOrderQty,
      maxOrderQty,
      thumbnail,
      discounts,
      nutritionFacts,
      netWeight,
      tags,
      seo,
      keywords,
      highlights,
      displaySettings,
    });

    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const productsList = await Product.find().sort({ createdAt: -1 });
    console.log("productlost", productsList);
    res.status(200).json({ success: true, productsList });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updates = req.body;

    if (req.file) {
      updates.thumbnail = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
      }
    );

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getProductsByCategorySlug = async (req, res) => {
  const { categorySlug } = req.params;

  try {
    const products = await Product.find({ categorySlug }).sort({ "displaySettings.priority": 1 });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: `No products found in category: ${categorySlug}` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by categorySlug:", error);
    res.status(500).json({
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

exports.getProductsByPriority = async (req, res) => {
  try {
    const products = await Product.find().sort({
      "displaySettings.priority": 1,
    });
    console.log("productlost", products);
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// PATCH /products/update-priorities
exports.updateProductPriorities = async (req, res) => {
  const { updated } = req.body;

  try {
    const bulkOps = updated.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { "displaySettings.priority": item.priority },
      },
    }));

    await Product.bulkWrite(bulkOps);
    res.status(200).json({ message: "Priorities updated successfully" });
  } catch (error) {
    console.error("Error updating priorities", error);
    res.status(500).json({ message: "Server Error" });
  }
};

