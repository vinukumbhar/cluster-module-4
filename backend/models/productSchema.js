const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const productSchema = new Schema(
  {
    // Identity
    productCode: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    brand: { type: String },
    category: { type: String },
    subCategory: { type: String },
    categorySlug: { type: String, required: true },
    barcode: { type: String },

    // Images
    thumbnail: { type: String },
    gallery: [{ type: String }],

    // Pricing
    mrp: { type: Number },
    defaultSellingPrice: { type: Number },
    gstRate: { type: Number },

    // Discounts
    discounts: {
      customer: {
        discountPercent: { type: Number, default: 0 },
        maxDiscountLimit: { type: Number, default: 0 },
      },
      wholeseller: {
        discountPercent: { type: Number, default: 0 },
        maxDiscountLimit: { type: Number, default: 0 },
      },
      dealer: {
        discountPercent: { type: Number, default: 0 },
        maxDiscountLimit: { type: Number, default: 0 },
      },
    },

    // Variants (Flexible attributes per variant)
    variants: [
      {
        variantCode: { type: String, required: true },
        label: { type: String },
        mrp: { type: Number },
        defaultSellingPrice: { type: Number },
        image: { type: String },
        attributes: [
          {
            name: { type: String },
            label: { type: String },
            type: { type: String },
            value: Schema.Types.Mixed,
          },
        ],
      },
    ],

    // Category-Specific fields
    nutritionFacts: {
      calories: { type: Number },

      carbs: { type: Number },
      fat: { type: Number },
      protein: { type: Number },

      calcium: { type: Number },

      // You can add more nutrients as needed
    },

    packingType: { type: String }, // e.g., "Bottle", "Packet", "Box"
    flavor: { type: String }, // e.g., "Vanilla", "Chocolate"
    netWeight: {
      value: { type: Number },
      unit: { type: String }, // e.g., "g", "kg", "ml", "L"
    },
    shelfLife: { type: String }, // e.g., "6 months", "1 year"
    storageInstructions: { type: String }, // e.g., "Store in cool dry place"
    // Marketing
    highlights: [String],
    description: { type: String },
    tags: [String],
    keywords: [String],
    seo: {
      title: { type: String },
      metaDescription: { type: String },
    },

    // Display Settings
    displaySettings: {
      showOnHome: { type: Boolean, },
      homeSection: { type: String },
      priority: { type: Number },
    },

    // Reviews
    reviews: {
      avgRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },

    // Constraints
    minOrderQty: { type: Number, default: 1 },
    maxOrderQty: { type: Number, default: 1000 },

    // Metadata
    createdBy: { type: Types.ObjectId },
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 });

module.exports = mongoose.model("Product", productSchema);
