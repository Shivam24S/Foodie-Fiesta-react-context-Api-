import { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgress from "../store/UserProgress";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

// const CartCheckOut = () => {
//   const {
//     data,
//     isLoading: isSending,
//     error,
//     sendRequest,
//     clearData,
//   } = useHttp("http://localhost:3000/orders", requestConfig);

// hosted api

const CartCheckOut = () => {
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(
    "https://backend-food-order-lsom.onrender.com/orders",
    requestConfig
  );

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

    // sending http  request using custom hook

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  };

  const handleFinish = () => {
    userProgressCtx.hideCart();
    cartCtx.clearCart();
    clearData();
  };

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was Successfully placed</p>
        <p>Your order is on their way now</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>sending order data...</span>;
  }
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
        {error && <Error title="failed to send order data" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};
export default CartCheckOut;
