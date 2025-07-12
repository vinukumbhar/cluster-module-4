const OrderTemplate = require('../models/orderTemplateModel');


const Product = require('../models/productSchema');



// exports.generateMergedProductList = async (req, res) => {
//   const { templateId } = req.params;

//   try {
//     const allProducts = await Product.find({}, '_id name');

//     const orderTemplate = await OrderTemplate.findById(templateId);

//     if (!orderTemplate) {
//       return res.status(404).json({ message: "Order template not found" });
//     }

//     const orderProductMap = new Map();
//     orderTemplate.products.forEach((entry) => {
//       orderProductMap.set(entry.productId.toString(), entry.quantity);
//     });

//     const mergedList = allProducts.map((product) => ({
    
//       productId: product._id,
//       name: product.name,
//       quantity: orderProductMap.get(product._id.toString()) || 0
//     }));

//     return res.status(200).json(mergedList);
//   } catch (error) {
//     console.error("Error generating merged product list:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };








// ✅ CREATE




exports.generateMergedProductList = async (req, res) => {
  const { templateId } = req.params;

  try {
    const allProducts = await Product.find({}, '_id name');

    const orderTemplate = await OrderTemplate.findById(templateId);

    if (!orderTemplate) {
      return res.status(404).json({ message: "Order template not found" });
    }

    const orderProductMap = new Map();
    orderTemplate.products.forEach((entry) => {
      orderProductMap.set(entry.productId.toString(), entry.quantity);
    });

    const mergedList = allProducts.map((product) => ({
      productId: product._id,
      name: product.name,
      quantity: orderProductMap.get(product._id.toString()) || 0
    }));

    return res.status(200).json({
      templateName: orderTemplate.templateName,
      products: mergedList
    });
  } catch (error) {
    console.error("Error generating merged product list:", error);
    return res.status(500).json({ message: "Server error" });
  }
};







exports.createOrderTemplate = async (req, res) => {
  try {
    const orderTemplate = new OrderTemplate(req.body);
    await orderTemplate.save();
    res.status(201).json(orderTemplate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ READ ALL
exports.getAllOrderTemplates = async (req, res) => {
  try {
    const templates = await OrderTemplate.find();
    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ READ BY ID
exports.getOrderTemplateById = async (req, res) => {
  try {
    const template = await OrderTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.status(200).json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
exports.updateOrderTemplate = async (req, res) => {
  try {
    const updatedTemplate = await OrderTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTemplate) return res.status(404).json({ error: 'Template not found' });
    res.status(200).json(updatedTemplate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ DELETE
exports.deleteOrderTemplate = async (req, res) => {
  try {
    const deletedTemplate = await OrderTemplate.findByIdAndDelete(req.params.id);
    if (!deletedTemplate) return res.status(404).json({ error: 'Template not found' });
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
