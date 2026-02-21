import { useEffect, useState } from "react";
import "./AddItemForm.css";

function AddItemForm({ onAddItem, error: duplicateError }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (duplicateError) {
      setError(duplicateError);
    }
  }, [duplicateError]);

  const handlInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setError("Item cannot be empty!");
      return;
    }

    const newItem = {
      id: Date.now(),
      text: trimmedValue,
      createdAt: new Date().toISOString(),
    };

    onAddItem(newItem);

    setInputValue("");
    setError("");
  };

  return (
    <div className="form-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            placeholder="Enter item name..."
            onChange={handlInputChange}
            className={`form-input ${error ? "error" : ""}`}
            autoFocus
          />

          <button type="submit" className="add-button">
            + Add Item
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default AddItemForm;
