const express = require("express");
const router = express.Router();
const orderTemplateController = require("../controllers/orderTemplateController");

router.post("/", orderTemplateController.createOrderTemplate);
router.get("/", orderTemplateController.getAllOrderTemplates);
router.get("/:id", orderTemplateController.getOrderTemplateById);
router.patch("/:id", orderTemplateController.updateOrderTemplate);
router.delete("/:id", orderTemplateController.deleteOrderTemplate);
// Your routes
router.get("/merged-products/:templateId",orderTemplateController.generateMergedProductList);
module.exports = router;
