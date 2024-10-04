// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        match: /^(http|https):\/\/[^ "]+$/, 
    },
});

module.exports = mongoose.model('Quiz', quizSchema);
