import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InventoryGallery from "../components/gallery/InventoryGallery";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import useFavorites from "../hooks/useFavorites";
import { useInventory } from "../store/InventoryContext";

function Favorites() {
  const {
    favoriteIds,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    syncFavoritesWithInventory,
  } = useFavorites();

  const { inventory, loading, error, fetchInventory } = useInventory();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    if (!loading) {
      syncFavoritesWithInventory(inventory);
    }
  }, [loading, inventory]);

  const favoriteItems = inventory.filter((item) =>
    favoriteIds.includes(item.id)
  );

  function handleRemoveFavorite(item) {
    removeFavorite(item.id);
  }

  if (loading) {
    return (
      <div>
        <div className="favorites-page-header">
          <div>
            <h2>Улюблені інвентарі</h2>
            <p>Завантаження актуальних даних...</p>
          </div>

          <Link to="/gallery" className="back-to-gallery">
            ← До галереї
          </Link>
        </div>

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
        <div className="favorites-page-header">
          <div>
            <h2>Улюблені інвентарі</h2>
            <p>Не вдалося завантажити актуальний список інвентарю.</p>
          </div>

          <Link to="/gallery" className="back-to-gallery">
            ← До галереї
          </Link>
        </div>

        <div className="gallery-state error-state">
          <h2>Помилка завантаження</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="favorites-page-header">
        <div>
          <h2>Улюблені інвентарі</h2>
          <p>
            Тут відображаються тільки актуальні товари, які існують у списку
            інвентарю.
          </p>
        </div>

        <Link to="/gallery" className="back-to-gallery">
          ← До галереї
        </Link>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="gallery-state">
          <h2>Улюблені відсутні</h2>
          <p>Додайте інвентар у список улюблених з галереї.</p>
        </div>
      ) : (
        <InventoryGallery
          inventory={favoriteItems}
          onOpen={setSelectedItem}
          onToggleFavorite={handleRemoveFavorite}
          isFavorite={isFavorite}
        />
      )}

      <InventoryQuickView
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedItem ? isFavorite(selectedItem.id) : false}
      />
    </div>
  );
}

export default Favorites;