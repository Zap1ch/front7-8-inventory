import { useEffect, useState } from "react";

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteInventory");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteInventory", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(item) {
    const exists = favorites.some((favorite) => favorite.id === item.id);

    if (exists) {
      setFavorites(favorites.filter((favorite) => favorite.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  }

  function removeFavorite(id) {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  }

  function isFavorite(id) {
    return favorites.some((favorite) => favorite.id === id);
  }

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
  };
}

export default useFavorites;