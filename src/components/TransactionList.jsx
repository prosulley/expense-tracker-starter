// Props received from parent App component
function TransactionList({
  transactions,
  categories,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  onDelete
}) {
  // ===== FILTERING LOGIC =====
  // Start with all transactions and filter based on selected criteria
  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

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
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
