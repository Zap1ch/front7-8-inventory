import { Link } from "react-router-dom";

function FavoritesBar({ count }) {
  return (
    <div className="favorites-bar">
      <div>
        <h2>Галерея інвентарю</h2>
        <p>
          Переглядайте інвентар, відкривайте деталі та додавайте позиції в
          улюблені.
        </p>
      </div>

      <Link to="/favorites" className="favorites-link">
        ❤️ Улюблені: {count}
      </Link>
    </div>
  );
}

export default FavoritesBar;