import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import {
  getInventoryItem,
  updateInventoryItem,
  updateInventoryPhoto,
} from "../services/inventoryApi";
import { useInventory } from "../store/InventoryContext";

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchInventory } = useInventory();

  const [item, setItem] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await getInventoryItem(id);
        setItem(data);
      } catch (err) {
        alert("Помилка при завантаженні інвентарю");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await updateInventoryItem(id, {
        inventory_name: data.name,
        description: data.description,
      });

      if (photo) {
        const formData = new FormData();
        formData.append("photo", photo);
        await updateInventoryPhoto(id, formData);
      }

      fetchInventory();
      navigate("/");
    } catch (err) {
      alert("Помилка при редагуванні інвентарю");
    }
  }

  if (loading) {
    return <p className="state-message">Завантаження...</p>;
  }

  if (!item) {
    return <p className="state-message">Інвентар не знайдено</p>;
  }

  return (
    <div>
      <h2>Редагувати інвентар</h2>

      <InventoryForm
        initialValues={item}
        onSubmit={handleSubmit}
        submitText="Зберегти зміни"
        withPhoto={false}
      />

      <div className="photo-update">
        <h3>Оновлення фотографії</h3>

        <input
          type="file"
          accept="image/*"
          onChange={(event) => setPhoto(event.target.files[0])}
        />

        <p className="hint">
          Фото оновиться після натискання кнопки “Зберегти зміни”.
        </p>
      </div>
    </div>
  );
}

export default AdminInventoryEdit;