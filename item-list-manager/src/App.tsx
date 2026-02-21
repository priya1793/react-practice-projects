import { useEffect, useState } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import type { Item } from "./types";
import "./App.css";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");

  const isDuplicate = (text: string, excludeId: number): boolean => {
    const normalizedText = text.trim().toLowerCase();
    return items.some((item) => {
      return (
        item.text.trim().toLowerCase() === normalizedText &&
        (excludeId === undefined || item.id !== excludeId)
      );
    });
  };

  // to add a new item
  const addItem = (newItem: Item) => {
    if (isDuplicate(newItem.text)) {
      setError(`"${newItem.text}" already exists in the list!`);
      return false;
    }
    setItems([...items, newItem]);
    setError("");
    return true;
  };

  // to delete an item
  const deleteItem = (id: number) => {
    setItems(items.filter((item) => Number(item.id) !== id));
  };

  // to edit an item
  const updateItem = (id: number, newText: string) => {
    if (isDuplicate(newText, id)) {
      setError(`"${newText}" already exists in the list!`);
      return false;
    }
    setItems(
      items.map((item) => (item.id === id ? { ...item, text: newText } : item)),
    );
    setError("");
    return true;
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="app-contaner">
        <header className="app-header">
          <h1>Item List Manager</h1>
          <p className="subtitile">Add and manage your items easily</p>
        </header>

        <main className="app-main">
          <AddItemForm onAddItem={addItem} error={error} />

          <ItemList
            items={items}
            onDeleteItem={deleteItem}
            onUpdateItem={updateItem}
          />
        </main>

        <footer className="app-footer">
          <p>Total Itemss: {items.length}</p>
        </footer>
      </div>
    </>
  );
}

export default App;
