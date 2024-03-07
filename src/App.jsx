import Cart from "./components/Cart";
import CartCheckOut from "./components/CartCheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgress";

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CartCheckOut />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
