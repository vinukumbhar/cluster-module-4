const mongoose = require('mongoose');



const ProductEntrySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  tentativePrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const CustomerInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  address: String,
});

const OrderTemplateSchema = new mongoose.Schema(
  {
    customer: {
      type: CustomerInfoSchema,
      required: true,
    },
    products: {
      type: [ProductEntrySchema],
      required: true,
    },
    totalInvoiceValue: {
      type: Number,
      required: true,
      min: 0,
    },
    templateName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OrderTemplate', OrderTemplateSchema);
