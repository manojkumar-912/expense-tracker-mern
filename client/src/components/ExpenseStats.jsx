import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/ExpenseStats.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#ffb347'];

const ExpenseStats = ({ stats }) => {
  if (!stats) {
    return null;
  }

  const chartData = Object.entries(stats.categoryStats || {}).map(([category, amount]) => ({
    name: category,
    value: parseFloat(amount.toFixed(2)),
  }));

  return (
    <section className="stats-section">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value">₹{stats.total?.toFixed(2) || '0.00'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Expense</div>
          <div className="stat-value">₹{stats.average?.toFixed(2) || '0.00'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value">{stats.count || 0}</div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="chart-container">
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default ExpenseStats;
