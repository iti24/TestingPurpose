const {createPricingPlanBasedModel} = require("../models/pricing");
const PricingPlan = createPricingPlanBasedModel("advance");


// Controller function to create a new pricing plan
const createPricingPlan = async (req, res) => {
    try {
        const { planType, price, features } = req.body;
        const newPricingPlan = new PricingPlan({
            planType,
            price,
            features
        });
        await newPricingPlan.save();
        res.status(201).json(newPricingPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update an existing pricing plan
const updatePricingPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPricingPlan = await PricingPlan.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPricingPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to get details of a pricing plan
const getPricingPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const pricingPlan = await PricingPlan.findById(id);
        if (!pricingPlan) {
            return res.status(404).json({ message: 'Pricing plan not found' });
        }
        res.status(200).json(pricingPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete a pricing plan
const deletePricingPlan = async (req, res) => {
    try {
        const { id } = req.params;
        await PricingPlan.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createPricingPlan,
    updatePricingPlan,
    getPricingPlan,
    deletePricingPlan
};