function InventoryCard({ item, onOpen, onToggleFavorite, isFavorite }) {
  return (
    <div className="gallery-card">
      <div className="card-image-wrapper" onClick={() => onOpen(item)}>
        {item.photo_url ? (
          <img
            src={`http://127.0.0.1:3000${item.photo_url}`}
            alt={item.name}
            className="gallery-img"
          />
        ) : (
          <div className="image-placeholder">Немає фото</div>
        )}
      </div>

      <div className="card-content">
        <h3>{item.name}</h3>

        <button
          className={isFavorite ? "favorite-btn active" : "favorite-btn"}
          onClick={() => onToggleFavorite(item)}
        >
          {isFavorite ? "❤️ Улюблене" : "🤍 Додати в улюблені"}
        </button>
      </div>
    </div>
  );
}

export default InventoryCard;