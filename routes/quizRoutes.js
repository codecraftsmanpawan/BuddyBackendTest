// routes/quizRoutes.js
const express = require('express');
const { getAllQuizzes, addQuiz, updateQuizUrl, deleteQuiz } = require('../controllers/quiz/quizController');

const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Get all quizzes
router.get('/quizzes', getAllQuizzes);

// Add multiple quizzes
router.post('/quizzes', addQuiz); 

// Update quiz URL
router.put('/quizzes/:id', updateQuizUrl);

// Delete a quiz
router.delete('/quizzes/:id', deleteQuiz); 

module.exports = router;
