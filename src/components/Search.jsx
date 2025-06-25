import { useState } from "react";
//useRef() gives you a little storage box you can use inside your component.
//You can put something in it (like a number, a timer, or an input element), and it will stay there without resetting every time the component re-renders.

import {  useRef } from "react";
//UseEffect hook/BuildinHooks/Personal
//1. Reg functions only be called from react comp.
//2. Sings comp. with external system API, so when comp. changes data changes as well
import { useEffect } from "react";
import styles from "./search.module.css";
const URL = `https://api.spoonacular.com/recipes/complexSearch`;
const API_KEY = "2d9c01885882495eb47cc2575c918eec";


// - inputValue = what the user is typing
// - query = triggers the fetch logic via useEffect
// - setQuery(inputValue) happens only on Search button click

//accept foodData and setFoodData as props from App.jsx state
export default function Search({ foodData, setFoodData, loading, setLoading }) {
  const [query, setQuery] = useState("pizza");
  //state for saving the food data
  const [inputValue, setInputValue]=useState("")
  //state for the selected diet input
  const [selectedDiets, setSelectedDiets] = useState([]);
 
  //2.Smart Search Suggestions with Auto-complete 
//track suggested results based on the user’s typing
  const [suggestions, setSuggestions] = useState([]);
  // add loading 


  async function fetchFood () {
    // join the selected diets with coma
    //- diet is only added if dietQuery is not empty
    //apiKey is always correctly placed

    const dietQuery = selectedDiets.join(","); // e.g., "vegan,vegetarian"
    const url = `${URL}?query=${query}&apiKey=${API_KEY}${dietQuery ? `&diet=${dietQuery}` : ""}`;
    const res = await fetch(url);

      //take the res and attach json, but we need to tell JS to wait until data is returned
      const data = await res.json();
      //in the console all the information is in obj
      console.log(data.results);
      //get the data array passed here as prop and set it to data.results
      setFoodData(data.results);
  }

  // fetching food results inside a useEffect that runs every time query changes, which is triggered only when the user clicks the Search button. 
  // useEffect(() => {
    
  //    fetchFood();
  // }, [query]); 

  //- If the user keeps typing, it cancels the last timeout and sets a new one — this is the debounce effect

 useEffect(() => {
  if (!inputValue.trim()) {
    setFoodData([]); // Clear results if empty input
    setLoading(false);
    return;
  }
  setLoading(true); //start loading

//- Wait 500ms before calling fetchFoodDebounced()
//- If the user keeps typing, it cancels the last timeout and sets a new one — this is the debounce effect
  const timeoutId = setTimeout(() => {
    fetchFoodDebounced().finally(()=>setLoading(false));//stop loading after fetch
  }, 500); // 500ms delay

//- It clears the previous setTimeout() with clearTimeout() to prevent firing old requests
  return () => clearTimeout(timeoutId);
}, [inputValue, selectedDiets]); // Trigger on input and filters


 //Handles the actual search results shown in the list/grid.async function fetchFoodDebounced() {
 async function fetchFoodDebounced() {
 
 const dietQuery = selectedDiets.join(",");
  const url = `${URL}?query=${inputValue}&apiKey=${API_KEY}${dietQuery ? `&diet=${dietQuery}` : ""}`;
  const res = await fetch(url);
  const data = await res.json();
  setFoodData(data.results);
}

//That fetchSuggestions(query) function is doing something totally separate and useful: 
// it powers autocomplete dropdown as the user types. It’s focused on suggesting recipe titles, not fetching the full results.
//Handles the autocomplete list (e.g. “pizza”, “pita”, “pinto beans”) as the user types.
//Think of fetchSuggestions as your app’s whisperer — helping users find the right query before they even finish typing.

  async function fetchSuggestions(query) {
  if (!query.trim()) {
    setSuggestions([]);
    return;
  }

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/autocomplete?number=5&query=${query}&apiKey=${API_KEY}`
    );
    const data = await res.json();
    setSuggestions(data); // [{ id, title }]
  } catch (err) {
    console.error("Error fetching suggestions:", err);
  }
}

  //It updates the selectedDiets array depending on whether a checkbox is being checked or unchecked.
function handleDietChange(e) {
//   If "vegan" is inside your selectedDiets array, that means the checkbox for Vegan should be checked—because the user has selected it.
// If it’s not in the array, the checkbox should be unchecked.

  const value = e.target.value;//Grabs the value of the checkbox the user just clicked
  setSelectedDiets((prev) =>//→ Updates the current state by passing in the previous array (prev), so you always work with the most recent version.


    prev.includes(value)//- If the value is already in the array (i.e. the box is being unchecked)
//- Already selected? Take it out.
      ? prev.filter((diet) => diet !== value) // remove //- we remove it with .filter().
//- Not selected yet? Add it in.

      : [...prev, value]                      // add
  );
}

//Don’t want to hit the API on every keystroke. Create a little delay to reduce calls

const typingTimeout = useRef(null);

function handleInputChange(e) {
  const value = e.target.value;
  setInputValue(value);

  if (typingTimeout.current) {
    clearTimeout(typingTimeout.current);
  }

  typingTimeout.current = setTimeout(() => {
    fetchSuggestions(value); // Calls Spoonacular
  }, 500); // 500ms debounce
}


  // Function to handle the search button
  function handleSearchClick(e) {
    e.preventDefault();
    setQuery(inputValue)//triger fetch with useeffect
    setSuggestions([]);

  }

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
  
  //Next how to create a state to save data from API results
  return (
  <form onSubmit={handleSearchClick}>
  <div className={styles.searchContainer}>
    <div className={styles.inputWrapper}>
    <input
      className={styles.input}
      type="text"

      //This way, handleInputChange() will run each time the user types, 
      // and internally it updates the inputValue and fires fetchSuggestions() after 500ms of inactivity

        onChange={handleInputChange}
      value={inputValue}
      placeholder="Search by ingredient..."
    />
    {/* The suggestion dropdown */}
    <ul className={styles.suggestionsList}>
  {suggestions.map((item) => (
    <li
      key={item.id}
      onClick={() => {
        setInputValue(item.title);
        setQuery(item.title);
        setSuggestions([]);
      }}
      className={styles.suggestionItem}
    >
      {item.title}
    </li>
  ))}
</ul>
</div>
{/* The filter  */}
    <div className={styles.filtersContainer}>
      {["vegetarian", "vegan", "ketogenic"].map((diet) => (
        <label key={diet} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            value={diet}
            checked={selectedDiets.includes(diet)}
            onChange={handleDietChange}
          />
          {diet.charAt(0).toUpperCase() + diet.slice(1)}
        </label>
      ))}
    </div>


    {/* Added button that will fetch the search quiery */}
      <button className={styles.button} type="submit">
    Search
  </button>

    </div>
    </form>
  );
}
