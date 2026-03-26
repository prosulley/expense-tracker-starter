// React hooks and component imports
import { useState } from 'react'
import './App.css'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'

// Main App component
function App() {
  // ===== TRANSACTIONS STATE =====
  // Initial sample transactions for demonstration
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: "5000", type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: "1200", type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: "150", type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: "800", type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: "95", type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: "65", type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: "45", type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: "15", type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  // ===== FORM STATE =====
  // State for the add transaction form fields
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  // State for editing (null = add mode, number = edit mode with that transaction's id)
  const [editingId, setEditingId] = useState(null);

  // ===== FILTER STATE =====
  // State for filtering transactions in the list
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // ===== CONSTANTS =====
  // Available categories for transactions
  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  // ===== COMPUTED VALUES =====
  // Calculate total income by summing all income-type transactions
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Calculate total expenses by summing all expense-type transactions
  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Calculate balance (income minus expenses)
  const balance = totalIncome - totalExpenses;

  // ===== EVENT HANDLERS =====
  // Handle form submission to add or update transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    if (editingId) {
      // Update existing transaction
      setTransactions(transactions.map(t =>
        t.id === editingId
          ? { ...t, description, amount, type, category }
          : t
      ));
      setEditingId(null);
    } else {
      // Create new transaction object with current form values
      const newTransaction = {
        id: Date.now(), // Generate unique ID using timestamp
        description,
        amount,
        type,
        category,
        date: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
      };
      setTransactions([...transactions, newTransaction]);
    }

    // Reset form
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  // Start editing a transaction
  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setType(transaction.type);
    setCategory(transaction.category);
  };

  // Cancel editing and reset form
  const handleCancelEdit = () => {
    setEditingId(null);
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  // Handle deletion of a transaction by ID
  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };


  // ===== RENDER =====
  return (
    <div className="app">
      {/* Header section */}
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      {/* Summary cards showing totals */}
      <div className="summary">
        <div className="summary-card">
          <h3>Income</h3>
          <p className="income-amount">${totalIncome}</p>
        </div>
        <div className="summary-card">
          <h3>Expenses</h3>
          <p className="expense-amount">${totalExpenses}</p>
        </div>
        <div className="summary-card">
          <h3>Balance</h3>
          <p className="balance-amount">${balance}</p>
        </div>
      </div>

      {/* Transaction form component */}
      <TransactionForm
        description={description}
        setDescription={setDescription}
        amount={amount}
        setAmount={setAmount}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        categories={categories}
        onSubmit={handleSubmit}
        editingId={editingId}
        onCancelEdit={handleCancelEdit}
      />

      {/* Transaction list component with filtering */}
      <TransactionList
        transactions={transactions}
        categories={categories}
        filterType={filterType}
        setFilterType={setFilterType}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App
