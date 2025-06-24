import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className='favorites-container'>
      <h2>Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="favorite-card">
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
              <button className='fav-btn' onClick={() => removeFavorite(recipe.id)}>Remove ❤️</button>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Favorites;