import { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgress from "../store/UserProgress";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const CartCheckOut = () => {
  const cartCtx = useContext(CartContext);

  const total = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const userProgressCtx = useContext(UserProgress);

  const handleClose = () => {
    userProgressCtx.hideCart();
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
    >
      <form>
        <h2>checkout</h2>
        <p>Total Amount {currencyFormatter.format(total)}</p>
        <Input label="Full Name" id="full-name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};
export default CartCheckOut;
