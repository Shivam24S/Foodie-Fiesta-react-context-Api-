import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import UserProgress from "../store/UserProgress";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const userProgressCtx = useContext(UserProgress);

  const handleClose = () => {
    userProgressCtx.hideCart();
  };

  const handleIncrease = (item) => {
    cartCtx.addItems(item);
  };

  const handleDecrease = (id) => {
    cartCtx.removeItems(id);
  };

  const goToCheckOut = () => {
    userProgressCtx.showCheckOut();
  };

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => {
              handleIncrease(item);
            }}
            onDecrease={() => {
              handleDecrease(item.id);
            }}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-action">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={goToCheckOut}>Go to Check Out</Button>
        )}
      </p>
    </Modal>
  );
};
export default Cart;
