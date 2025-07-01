import { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home'; // Adjust path if necessary


import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";

import Favorites from './pages/Favorites'; // new page you'll create


function App() {
  //becouse data is array we need to save the use State in an array to use it in any comp
  //can also pass food date in any comp
  const [foodData, setFoodData] = useState([]);
  //becouse List items comp and FoodDetails component are both part of App.js
  //we create state foodId in the App.js comp.
  //set the food id from receipts to the foodId state
  const [foodId, setFoodId] = useState("656329");
    const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Nav />
  

 <Routes>
  <Route path="/" element={<HomePage />} />

  <Route
    path="/search"
    element={
      <>
        <Search foodData={foodData} setFoodData={setFoodData} setLoading={setLoading} />
        <Container>
          <InnerContainer>
            <FoodList setFoodId={setFoodId} foodData={foodData} loading={loading} />
          </InnerContainer>
          <InnerContainer>
            <FoodDetails foodId={foodId} />
          </InnerContainer>
        </Container>
      </>
    }
  />

  <Route path="/recipe/:id" element={<FoodDetails />} />
  <Route path="/favorites" element={<Favorites />} />
</Routes>
</div>
  )
}



//1 To create component on the right hand side of the application:
//-Create a container component of type flex to put fooditem list on the left and another to receipt view

// To get the food details we need to use the id of the data
//Add on click in food item

export default App;
