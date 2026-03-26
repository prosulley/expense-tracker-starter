// React hooks and component imports
import { useState } from 'react'

// Props received from parent App component
function TransactionList({
  transactions,
  categories,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  onDelete,
  onEdit
}) {
  // ===== DELETE CONFIRMATION STATE =====
  // Track which transaction is pending deletion (null if no pending delete)
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Find the transaction being deleted for display in confirmation
  const pendingTransaction = transactions.find(t => t.id === pendingDeleteId);

  // ===== FILTERING LOGIC =====
  // Start with all transactions and filter based on selected criteria
  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  // ===== EVENT HANDLERS =====
  // Show confirmation dialog for delete
  const handleDeleteClick = (id) => {
    setPendingDeleteId(id);
  };

  // Confirm deletion and call parent handler
  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      onDelete(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  // Cancel deletion and close dialog
  const handleCancelDelete = () => {
    setPendingDeleteId(null);
  };

  return (
    // Transactions list container section
    <div className="transactions">
      <h2>Transactions</h2>

      {/* Filter controls */}
      <div className="filters">
        {/* Filter by transaction type (income/expense/all) */}
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {/* Filter by category */}
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Transactions table */}
      <table>
        {/* Table header row */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body with filtered transactions */}
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              {/* Amount cell with conditional styling and sign */}
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "-"}${t.amount}
              </td>
              {/* Delete button for this transaction */}
              <td>
                <button className="edit-btn" onClick={() => onEdit(t)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete confirmation modal */}
      {pendingDeleteId && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Delete "{pendingTransaction?.description}"?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-buttons">
              <button onClick={handleCancelDelete}>Cancel</button>
              <button onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
