import InventoryCard from "./InventoryCard";

function InventoryGallery({
  inventory,
  onOpen,
  onToggleFavorite,
  isFavorite,
}) {
  if (inventory.length === 0) {
    return (
      <div className="empty-gallery">
        <h2>Інвентар відсутній</h2>
        <p>Поки що немає елементів для відображення у галереї.</p>
      </div>
    );
  }

  return (
    <div className="gallery-grid">
      {inventory.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(item.id)}
        />
      ))}
    </div>
  );
}

export default InventoryGallery;