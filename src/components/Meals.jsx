import Axios from "axios";
import { useEffect, useState } from "react";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  // useEffect(() => {
  //   async function getMeals() {
  //     const response = await Axios.get("http://localhost:3000/meals");
  //     setLoadedMeals(response.data);
  //   }
  //   getMeals();
  // }, []);

  // console.log("meals Data=>", loadedMeals);

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
