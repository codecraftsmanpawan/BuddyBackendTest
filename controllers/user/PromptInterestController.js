const Prompt = require('../../models/Prompt'); 
const Interest = require('../../models/Interest');

// Controller to get all prompts
const getPrompts = async (req, res) => {
  try {
    // Fetch all prompts from the database
    const prompts = await Prompt.find();
    res.status(200).json(prompts); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prompts', error: error.message });
  }
};


// Controller to get all interests
const getInterests = async (req, res) => {
  try {
    // Fetch all interests from the database
    const interests = await Interest.find();
    res.status(200).json(interests); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interests', error: error.message });
  }
};

module.exports = { getPrompts, getInterests };
