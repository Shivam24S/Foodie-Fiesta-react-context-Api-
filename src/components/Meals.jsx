import Axios from "axios";
import { useEffect, useState } from "react";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  // here i m using browser built in method fetch for https requests

  // useEffect(() => {
  //   try {
  //     async function getMeals() {
  //       const response = await fetch("http://localhost:3000/meals");
  //       const meals = await response.json();
  //       setLoadedMeals(meals);
  //     }
  //     getMeals();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // here i m using external axios library for https request
  // its preferred because you don't have to convert data in json format
  // it easy to use

  useEffect(() => {
    try {
      async function getMeals() {
        const response = await Axios.get("http://localhost:3000/meals");
        setLoadedMeals(response.data);
      }
      getMeals();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log("meals Data=>", loadedMeals);

  return (
    <>
      <ul id="meals">
        {loadedMeals.map((meals) => (
          <li key={meals.id}>{meals.name}</li>
        ))}
      </ul>
    </>
  );
};
export default Meals;
