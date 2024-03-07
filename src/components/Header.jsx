import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const Header = () => {
  const cartCtx = useContext(CartContext);

  const Total = cartCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="Logo" />
          <h1>Foodie</h1>
        </div>
        <nav>
          <Button textOnly>Cart({Total})</Button>
        </nav>
      </header>
    </>
  );
};
export default Header;
