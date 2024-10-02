import FoodItem from "./FoodItem";
//accept foodData and setFoodId as props
//List is going to render multiple items that is why we need to move single item in separate component Food Item
export default function FoodList({ foodData, setFoodId }) {
  return (
    <div>
      {/* When we use map to render multiple items always add key prop*/}

      {foodData.map((food) => (
        //include the food item in the list that will represent each item
        //food={food} -pass parametar each food item as prop in Food Item
        <FoodItem setFoodId={setFoodId} key={food.id} food={food} />
      ))}
    </div>
  );
}
