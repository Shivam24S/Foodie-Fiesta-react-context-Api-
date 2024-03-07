import { createContext, useState } from "react";

const UserProgress = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export function UserProgressProvider({ children }) {
  const [userProgressData, setUserProgressData] = useState();

  const showCart = () => {
    setUserProgressData("cart");
  };
  const hideCart = () => {
    setUserProgressData("");
  };

  const showCheckOut = () => {
    setUserProgressData("checkout");
  };
  const hideCheckOut = () => {
    setUserProgressData("");
  };
  const userProgressCtx = {
    progress: userProgressData,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
  };

  console.log("showCart function checking", userProgressCtx.showCart);

  return (
    <UserProgress.Provider value={userProgressCtx}>
      {children}
    </UserProgress.Provider>
  );
}

export default UserProgress;
