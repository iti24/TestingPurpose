const express = require('express');
const router = express.Router();
const pricingPlanController = require('../controller/pricing');

// Route for creating a new pricing plan
router.post('/', pricingPlanController.createPricingPlan);

// Route for updating an existing pricing plan
router.put('/:id', pricingPlanController.updatePricingPlan);

// Route for getting details of a pricing plan
router.get('/:id', pricingPlanController.getPricingPlan);

// Route for deleting a pricing plan
router.delete('/:id', pricingPlanController.deletePricingPlan);

module.exports = router;