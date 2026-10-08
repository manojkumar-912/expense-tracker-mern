const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const userId = req.userId;

    if (!amount || !category) {
      return res.status(400).json({ message: 'Please provide amount and category' });
    }

    const expense = await Expense.create({
      userId,
      amount,
      category,
      description,
      date: date || Date.now(),
    });

    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const { category, startDate, endDate } = req.query;

    let filter = { userId };

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({ expenses, total, count: expenses.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { amount, category, description, date } = req.body;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this expense' });
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();

    res.json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await Expense.findByIdAndDelete(id);

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userId = req.userId;

    const expenses = await Expense.find({ userId });

    const categoryStats = {};
    expenses.forEach((exp) => {
      if (!categoryStats[exp.category]) {
        categoryStats[exp.category] = 0;
      }
      categoryStats[exp.category] += exp.amount;
    });

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const average = expenses.length > 0 ? total / expenses.length : 0;

    res.json({ categoryStats, total, average, count: expenses.length });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};
