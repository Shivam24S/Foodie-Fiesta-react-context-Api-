import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgress from "../store/UserProgress";

const Header = () => {
  const cartCtx = useContext(CartContext);

  const total = cartCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgress);

  const handleShowCart = () => {
    userProgressCtx.showCart();
    console.log("button pressed", userProgressCtx);
  };

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="Logo" />
          <h1>FoodieFiesta</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart({total})
          </Button>
        </nav>
      </header>
    </>
  );
};
export default Header;
