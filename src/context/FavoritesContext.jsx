// creates a context provider that globally manages a list of favorite recipes 
// and syncs them to localStorage, so even after a refresh, the data sticks around.
// 1 Creates a shared state for favorites
// 2 Keeps it in sync with localStorage
// 3  Makes that state usable across the app


import { createContext, useEffect, useState } from 'react';//- createContext creates the shared context.

export const FavoritesContext = createContext();//- Sets up the context object we’ll use with useContext() in other components.

export const FavoritesProvider = ({ children }) => {

//- Initializes your favorites list as an empty array. This state will hold all saved recipes.
 const [favorites, setFavorites] = useState([]);

  // Load from localStorage on start
 // - Runs once when the app starts.
//- Tries to pull any saved recipes from localStorage. If there’s nothing stored, it falls back to an empty array.
//- Then it sets that data as your favorites state.

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  // Save when receipt favorites changes to localStorage
  //- Watches for changes to favorites.
//- Every time the list changes, it updates localStorage so the data sticks after reloads.

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


//   - Adds a recipe to the list only if it’s not already saved.
// - Uses find() to avoid duplicate favorites based on the recipe’s id.
 const addFavorite = (recipe) => {
    if (!favorites.find((item) => item.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

// - Removes a recipe by filtering it out based on its id If Id is same remove it
const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  //- Makes the favorites list and functions (addFavorite, removeFavorite) available to all components wrapped inside.
//- Any component can access this shared data using useContext(FavoritesContext).
 return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};