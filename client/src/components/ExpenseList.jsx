import React from 'react';
import '../styles/ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return <div className="no-expenses">No expenses found. Add one to get started!</div>;
  }

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{new Date(expense.date).toLocaleDateString()}</td>
            <td>
              <span className={`category-badge ${expense.category.toLowerCase()}`}>
                {expense.category}
              </span>
            </td>
            <td>{expense.description || '-'}</td>
            <td className="amount">₹{expense.amount.toFixed(2)}</td>
            <td className="actions">
              <button
                onClick={() => onEdit(expense)}
                className="btn-edit"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(expense._id)}
                className="btn-delete"
                title="Delete"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
