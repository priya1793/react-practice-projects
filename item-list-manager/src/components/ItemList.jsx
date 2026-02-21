import { useState } from "react";
import "./ItemList.css";

function ItemList({ items, onDeleteItem, onUpdateItem }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (item) => {
    setEditId(item.id);
    setEditText(item.text);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditText("");
  };

  const saveEditing = (id) => {
    if (editText.trim()) {
      onUpdateItem(id, editText.trim());
    }

    cancelEditing();
  };

  const handleKeydown = (e, id) => {
    if (e.key === "Enter") {
      saveEditing(id);
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  if (items?.length == 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No items yet</h3>
        <p>Add your first item using the form above!</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2>your items {items.length}</h2>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            {editId === item.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeydown(e, item.id)}
                  className="edit-input"
                  autoFocus
                />

                <div className="edit-actions">
                  <button
                    onClick={() => saveEditing(item.id)}
                    className="save-button"
                    title="Save"
                  >
                    💾
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="cancel-button"
                    title="Cancel"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <>
                <div className="item-content">
                  <span className="item-text">{item.text}</span>
                  <small className="item-date">{item.createdAt}</small>
                </div>

                <div className="item-actions">
                  <button
                    onClick={() => startEditing(item)}
                    className="edit-button"
                    aria-label="Edit item"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="delete-button"
                    aria-label="Delete item"
                  >
                    ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
