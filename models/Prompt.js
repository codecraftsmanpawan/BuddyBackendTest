const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
