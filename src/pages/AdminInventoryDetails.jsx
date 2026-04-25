import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InventoryDetails from "../components/inventory/InventoryDetails";
import { getInventoryItem } from "../services/inventoryApi";

function AdminInventoryDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await getInventoryItem(id);
        setItem(data);
        setError("");
      } catch (err) {
        setError("Помилка при завантаженні деталей інвентарю");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) {
    return <p className="state-message">Завантаження...</p>;
  }

  if (error) {
    return <p className="state-message error">{error}</p>;
  }

  return (
    <div>
      <Link to="/" className="back-link">
        ← Назад до списку
      </Link>

      <InventoryDetails item={item} />
    </div>
  );
}

export default AdminInventoryDetails;