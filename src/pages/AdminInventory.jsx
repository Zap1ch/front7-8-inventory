import { useState } from "react";
import InventoryTable from "../components/inventory/InventoryTable";
import ConfirmModal from "../components/inventory/ConfirmModal";
import { useInventory } from "../store/InventoryContext";
import { deleteInventoryItem } from "../services/inventoryApi";

function AdminInventory() {
  const { inventory, loading, error, fetchInventory } = useInventory();
  const [selectedItem, setSelectedItem] = useState(null);

  async function handleDeleteConfirm() {
    if (!selectedItem) return;

    try {
      await deleteInventoryItem(selectedItem.id);
      setSelectedItem(null);
      fetchInventory();
    } catch (err) {
      alert("Помилка при видаленні");
    }
  }

  function handleDeleteClick(item) {
    setSelectedItem(item);
  }

  function handleCancel() {
    setSelectedItem(null);
  }

  if (loading) {
    return <p className="state-message">Завантаження...</p>;
  }

  if (error) {
    return <p className="state-message error">Помилка: {error}</p>;
  }

  if (inventory.length === 0) {
    return <p className="state-message">Інвентар відсутній</p>;
  }

  return (
    <div>
      <h2>Список інвентарю</h2>

      <InventoryTable
        inventory={inventory}
        onDeleteClick={handleDeleteClick}
      />

      <ConfirmModal
        item={selectedItem}
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AdminInventory;