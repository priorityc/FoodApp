import { useState } from "react";
//UseEffect hook/BuildinHooks/Personal
//1. Reg functions only be called from react comp.
//2. Sings comp. with external system API, so when comp. changes data changes as well
import { useEffect } from "react";
import styles from "./search.module.css";
const URL = `https://api.spoonacular.com/recipes/complexSearch`;
const API_KEY = "2d9c01885882495eb47cc2575c918eec";

//accept foodData and setFoodData as props from App.jsx state
export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  //state for saving the food data

  //Syntax of the useeffect hoock Only when input changes we make a API call using React hook
  //passing callback func and dependency array
  // 2 tipes of hook-BUILD IN OR OWN it sings component with outside external system
  // useEffect(()=> {},[]) passing first the CALL BACK FUNC and then  the dependancy list- array
  // useEffect(() => {
  //   function demo() {
  //     console.log("Demo function executed");
  //   }
  //   demo();
  // }, [anyState]);
  //Whenever query changes I want to execute useEffect
  //Whenever state we pass in dependency array will triger function within useEffect to execute
  // useEffect(() => {
  //   function fetchFood() {
  //     const res = fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
  //     //response is in JSON format decode JSON format data and save it in var. data
  //     const data = res.json();//but this data execute instantly does not wait
  //     console.log(data);
  //   }
  //   fetchFood();
  // }, []);

  useEffect(() => {
    //here we can use promise as well .then
    async function fetchFood() {
      //fetch the data and wait
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      //take the res and attach json, but we need to tell JS to wait until data is returned
      const data = await res.json();
      //in the console all the information is in obj
      console.log(data.results);
      //get the data array passed here as prop and set it to data.results
      setFoodData(data.results);
    } //function is not defined
    fetchFood();
  }, [query]); //execute demo func when type in

  //Next how to create a state to save data from API results
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        // Take any input from the search bar and asign it to query
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
}
