import FoodItem from "./FoodItem";
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import styles from "./foodlist.module.css";

//accept foodData and setFoodId as props
//List is going to render multiple items that is why we need to move single item in separate component Food Item
export default function FoodList({ foodData, setFoodId, loading, setLoading }) {

    const { addFavorite } = useContext(FavoritesContext);

  return (
 
      <div className={styles.card}>
        
            {/* When we use map to render multiple items always add key prop*/}
{loading ? (
  <p className={styles.loader}>Loading recipes...</p>
) : foodData.length > 0 ? (
  foodData.map((food) => (
    <FoodItem
      setFoodId={setFoodId}
      key={food.id}
      food={food}
      addFavorite={addFavorite}
    />
  ))
) : (
  <p className={styles.noResults}>
    No recipes found for that combo — try adjusting your search or removing some filters!
  </p>
)}

   </div>
 
  )
}
