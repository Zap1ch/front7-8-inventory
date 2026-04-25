function InventoryDetails({ item }) {
  if (!item) return <p>Не знайдено</p>;

  return (
    <div className="details-card">
      {item.photo_url && (
        <img
          src={`http://127.0.0.1:3000${item.photo_url}`}
          alt={item.name}
          className="details-img"
        />
      )}

      <div>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default InventoryDetails;