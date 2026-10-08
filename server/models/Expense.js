const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping', 'Other'],
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
