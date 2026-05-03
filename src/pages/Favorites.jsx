import { Link } from "react-router-dom";
import InventoryGallery from "../components/gallery/InventoryGallery";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import useFavorites from "../hooks/useFavorites";
import { useState } from "react";

function Favorites() {
  const { favorites, toggleFavorite, removeFavorite, isFavorite } =
    useFavorites();

  const [selectedItem, setSelectedItem] = useState(null);

  function handleRemoveFavorite(item) {
    removeFavorite(item.id);
  }

  return (
    <div>
      <div className="favorites-page-header">
        <div>
          <h2>Улюблені інвентарі</h2>
          <p>Тут відображаються позиції, які були додані в улюблені.</p>
        </div>

        <Link to="/gallery" className="back-to-gallery">
          ← До галереї
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="gallery-state">
          <h2>Улюблені відсутні</h2>
          <p>Додайте інвентар у список улюблених з галереї.</p>
        </div>
      ) : (
        <InventoryGallery
          inventory={favorites}
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