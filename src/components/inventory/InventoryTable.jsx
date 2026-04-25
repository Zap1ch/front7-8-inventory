import { Link } from "react-router-dom";

function InventoryTable({ inventory, onDeleteClick }) {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Назва</th>
          <th>Опис</th>
          <th>Дії</th>
        </tr>
      </thead>

      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td>
              {item.photo_url ? (
                <img
                  src={`http://127.0.0.1:3000${item.photo_url}`}
                  alt={item.name}
                  className="preview-img"
                />
              ) : (
                "—"
              )}
            </td>

            <td>{item.name}</td>
            <td>{item.description || "Без опису"}</td>

            <td className="actions">
              <Link to={`/inventory/${item.id}`}>Переглянути</Link>
              <Link to={`/inventory/${item.id}/edit`}>Редагувати</Link>
              <button onClick={() => onDeleteClick(item)}>
                Видалити
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;