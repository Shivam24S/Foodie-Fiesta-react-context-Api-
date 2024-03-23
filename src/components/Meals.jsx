import MealsItem from "./MealsItem";
import useHttp from "./hooks/useHttp";
import Loader from "./Loader";
import Error from "./Error";

const requestConfig = {};

const Meals = () => {
  // now here i m using custom hook for sending http request to get data because while sending request there two state i have to handle
  // loading and error  and i  m here using two time http request and i want this both state in both http request thats why i created
  // custom hook http request where i m manage both state i can use another http request as well

  // const {
  //   data: loadedMeals,
  //   isLoading,
  //   error,
  // } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // using hosted backend
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(
    "https://backend-food-order-lsom.onrender.com/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error title="Failed to fetch Food Data" message={error} />;
  }

  console.log("meals Data=>", loadedMeals);

  return (
    <>
      <ul id="meals">
        {loadedMeals.map((meals) => (
          <MealsItem key={meals.id} meal={meals} />
        ))}
      </ul>
    </>
  );
};
export default Meals;
