import { useNavigate } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import { createInventoryItem } from "../services/inventoryApi";
import { useInventory } from "../store/InventoryContext";

function AdminInventoryCreate() {
  const navigate = useNavigate();
  const { fetchInventory } = useInventory();

  async function handleSubmit(data) {
    try {
      const formData = new FormData();

      formData.append("inventory_name", data.name);
      formData.append("description", data.description || "");

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      await createInventoryItem(formData);

      fetchInventory();
      navigate("/");
    } catch (err) {
      alert("Помилка при створенні інвентарю");
    }
  }

  return (
    <div>
      <h2>Додати інвентар</h2>

      <InventoryForm
        onSubmit={handleSubmit}
        submitText="Створити"
        withPhoto={true}
      />
    </div>
  );
}

export default AdminInventoryCreate;