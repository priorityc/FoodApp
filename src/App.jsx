import { useState } from "react";
import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";

function App() {
  //becouse data is array we need to save the use State in an array to use it in any comp
  //can also pass food date in any comp
  const [foodData, setFoodData] = useState([]);
  //becouse List items comp and FoodDetails component are both part of App.js
  //we create state foodId in the App.js comp.
  //set the food id from receipts to the foodId state
  const [foodId, setFoodId] = useState("656329");

  return (
    <div className="App">
      <Nav />
      {/* Pass the foodData and setFoodData as props */}
      <Search foodData={foodData} setFoodData={setFoodData} />
      {/* //Pass this data into foodList component to display foods
      {foodData.map((food)=>{
        <h1>{food.title}</h1>
      })} */}

      {/* Container component to structure other components */}
      <Container>
        {/* InnerContainer will render foodlist component */}
        <InnerContainer>
          {/* Passing set food Id here so the Fodd list will have access to the state id */}
          {/* When you nest components you need to render it inside the cont component */}
          {/* Foodlist become children component and placed on the left*/}
          <FoodList setFoodId={setFoodId} foodData={foodData} />
        </InnerContainer>

        <InnerContainer>
          {/* Foodlist become children component and placed on the right*/}

          <FoodDetails foodId={foodId} />
        </InnerContainer>
      </Container>
    </div>
  );
}

//1 To create component on the right hand side of the application:
//-Create a container component of type flex to put fooditem list on the left and another to receipt view

// To get the food details we need to use the id of the data
//Add on click in food item

export default App;
