import { useEffect, useState } from "react";

function normalizeFavorites(savedFavorites) {
  if (!savedFavorites) {
    return [];
  }

  try {
    const parsed = JSON.parse(savedFavorites);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((favorite) => {
        if (typeof favorite === "object" && favorite !== null) {
          return favorite.id;
        }

        return favorite;
      })
      .filter((id) => id !== undefined && id !== null);
  } catch (error) {
    return [];
  }
}

function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteInventory");
    return normalizeFavorites(savedFavorites);
  });

  useEffect(() => {
    localStorage.setItem("favoriteInventory", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function toggleFavorite(item) {
    setFavoriteIds((prevIds) => {
      const exists = prevIds.includes(item.id);

      if (exists) {
        return prevIds.filter((id) => id !== item.id);
      }

      return [...prevIds, item.id];
    });
  }

  function removeFavorite(id) {
    setFavoriteIds((prevIds) => prevIds.filter((favoriteId) => favoriteId !== id));
  }

  function isFavorite(id) {
    return favoriteIds.includes(id);
  }

  function syncFavoritesWithInventory(inventory) {
    const existingIds = inventory.map((item) => item.id);

    setFavoriteIds((prevIds) =>
      prevIds.filter((id) => existingIds.includes(id))
    );
  }

  return {
    favoriteIds,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    syncFavoritesWithInventory,
  };
}

export default useFavorites;