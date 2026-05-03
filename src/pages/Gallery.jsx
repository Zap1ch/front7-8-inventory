import { useState } from "react";
import InventoryGallery from "../components/gallery/InventoryGallery";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import FavoritesBar from "../components/gallery/FavoritesBar";
import useFavorites from "../hooks/useFavorites";
import { useInventory } from "../store/InventoryContext";

function Gallery() {
  const { inventory, loading, error } = useInventory();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) {
    return (
      <div>
        <FavoritesBar count={favorites.length} />
        <div className="skeleton-grid">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <FavoritesBar count={favorites.length} />
        <div className="gallery-state error-state">
          <h2>Помилка завантаження</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FavoritesBar count={favorites.length} />

      <InventoryGallery
        inventory={inventory}
        onOpen={setSelectedItem}
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      <InventoryQuickView
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedItem ? isFavorite(selectedItem.id) : false}
      />
    </div>
  );
}

export default Gallery;