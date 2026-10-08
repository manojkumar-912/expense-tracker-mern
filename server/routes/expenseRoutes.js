const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getStats,
} = require('../controllers/expenseController');

const router = express.Router();

// Protect all routes with auth middleware
router.use(authMiddleware);

router.post('/', addExpense);
router.get('/', getExpenses);
router.get('/stats', getStats);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
