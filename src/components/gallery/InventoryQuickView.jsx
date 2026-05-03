function InventoryQuickView({ item, onClose, onToggleFavorite, isFavorite }) {
  if (!item) {
    return null;
  }

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={(event) => event.stopPropagation()}>
        <button className="quick-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="quick-image-block">
          {item.photo_url ? (
            <img
              src={`http://127.0.0.1:3000${item.photo_url}`}
              alt={item.name}
              className="quick-img"
            />
          ) : (
            <div className="quick-placeholder">Немає фото</div>
          )}
        </div>

        <div className="quick-info">
          <h2>{item.name}</h2>
          <p>{item.description || "Опис відсутній"}</p>

          <button
            className={isFavorite ? "favorite-btn active" : "favorite-btn"}
            onClick={() => onToggleFavorite(item)}
          >
            {isFavorite ? "❤️ В улюблених" : "🤍 Додати в улюблені"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryQuickView;