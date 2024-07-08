const mongoose = require("mongoose");

const createPricingPlanBasedModel = (planType) => {
    // Check if model with given planType name already exists
    if (mongoose.models[planType]) {
        // If model exists, return the existing model
        return mongoose.model(planType);
    }

    // Define schema for the new model
    const schema = new mongoose.Schema({
       
        planType: { type: 'string', default: planType || '' },
        price: { type: Number, required: true },

features: [{ type: String}] // Array of feature strings

       
        // Other fields...
    });

    // Create and return the Mongoose model using the provided planType name and schema
    return mongoose.model(planType, schema);
};

module.exports = { createPricingPlanBasedModel };