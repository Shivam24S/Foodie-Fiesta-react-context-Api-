import { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgress from "../store/UserProgress";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import Axios from "axios";

const CartCheckOut = () => {
  const cartCtx = useContext(CartContext);

  const total = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const userProgressCtx = useContext(UserProgress);

  const handleClose = () => {
    userProgressCtx.hideCart();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    Axios.post("http://localhost:3000/orders", {
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
      // Optionally, you can handle success response here
    }).then((response) => {
      console.log("Order placed successfully:", response.data);
    });
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>checkout</h2>
        <p>Total Amount {currencyFormatter.format(total)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="number" />
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
