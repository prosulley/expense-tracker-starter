// Props received from parent App component
function TransactionForm({
  description,
  setDescription,
  amount,
  setAmount,
  type,
  setType,
  category,
  setCategory,
  categories,
  onSubmit,
  editingId,
  onCancelEdit
}) {
  return (
    // Form container section
    <div className="add-transaction">
      <h2>{editingId ? "Edit Transaction" : "Add Transaction"}</h2>
      <form onSubmit={onSubmit}>
        {/* Description text input */}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Amount number input */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {/* Transaction type select (income or expense) */}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {/* Category select dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Submit button */}
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" onClick={onCancelEdit}>Cancel</button>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;
