// controllers/quizController.js
const Quiz = require('../../models/Quiz');

// Get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add  quizzes
const addQuiz = async (req, res) => {
    const { title, url } = req.body; // Expecting a single { title, url }
    
    try {
        const quiz = new Quiz({ title, url });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: 'Error adding quiz', error });
    }
};

// Update the quiz URL
const updateQuizUrl = async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            id,
            { url },
            { new: true, runValidators: true }
        );
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a quiz by ID
const deleteQuiz = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findByIdAndDelete(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getAllQuizzes,
    addQuiz,
    updateQuizUrl,
    deleteQuiz
};