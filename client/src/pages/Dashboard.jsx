import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { expenseService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseStats from '../components/ExpenseStats';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState({ category: '', startDate: '', endDate: '' });
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchExpenses();
      fetchStats();
    }
  }, [user, navigate, filter]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseService.getExpenses(
        filter.category || undefined,
        filter.startDate || undefined,
        filter.endDate || undefined
      );
      setExpenses(response.data.expenses);
      setError('');
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await expenseService.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  const handleAddExpense = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingExpense(null);
    fetchExpenses();
    fetchStats();
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        fetchExpenses();
        fetchStats();
      } catch (err) {
        setError('Failed to delete expense');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Expense Tracker</h1>
        <div className="header-right">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {error && <div className="error-message">{error}</div>}

        {stats && <ExpenseStats stats={stats} />}

        <section className="expenses-section">
          <div className="section-header">
            <h2>Your Expenses</h2>
            <button onClick={handleAddExpense} className="btn-primary">
              Add Expense
            </button>
          </div>

          <div className="filters">
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
              placeholder="Start Date"
            />

            <input
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
              placeholder="End Date"
            />
          </div>

          {loading ? (
            <p>Loading expenses...</p>
          ) : (
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          )}
        </section>

        {showForm && (
          <ExpenseForm
            expense={editingExpense}
            onClose={handleFormClose}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
