import styles from "./fooditem.module.css";

//to set foodId on FoodItem use props setFoodId
export default function FoodItem({ food, setFoodId }) {
  return (
    <div className={styles.itemContainer}>
      <img className={styles.itemImage} src={food.image} alt="food image" />
      <div className={styles.itemContent}>
        <p className={styles.itemName}>{food.title}</p>
      </div>
      <div className={styles.buttonContainer}>
        {" "}
        {/* Button to view the receipt for this item */}
        {/* fetch the receipt details for specific food item */}
        <button
          className={styles.itemButton}
          // When click log the id of the food item that I clicked on
          onClick={() => {
            // console.log(food.id);
            // We need to have access to the id
            //Based on this id we want to fetch the receipt of this id
            //How to take the id from List items and place it in food details
            //set food id to the value of the item that has been clicked
            setFoodId(food.id);
          }}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
