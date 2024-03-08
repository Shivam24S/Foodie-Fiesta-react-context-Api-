import { createContext, useState } from "react";

const CartContext = createContext({
  items: [],
  addItems: (item) => {},
  removeItems: (id) => {},
  clearCart: () => {},
});

export function CartContextProvider({ children }) {
  const [items, setItems] = useState([]);
  //   const handleAddItems = (newItem) => {
  //     setItems((prevItems) => {
  //       // checking if existing item already exists or not
  //       let existingItemIndex = prevItems.findIndex(
  //         (item) => item.id === newItem.id
  //       );
  //       console.log("existing item index: " + existingItemIndex);

  //       const existingItems = prevItems[existingItemIndex];
  //       console.log("existing items: " + existingItems);

  //       let updatedItems;

  //       if (existingItems) {
  //         const updatingItemQuantity = {
  //           ...existingItems,
  //           quantity: existingItems.quantity + 1,
  //         };
  //         console.log("updating item quantity: " + updatingItemQuantity);
  //         updatedItems = [...prevItems];
  //         console.log("prev updated items: " + updatedItems);
  //         updatedItems[existingItemIndex] = updatingItemQuantity;
  //         console.log("updated items with existing index");
  //       } else {
  //         updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
  //       }
  //       return updatedItems;
  //     });
  //   };

  // re writing this code again for better practice and understanding

  const handleAddItems = (newItem) => {
    setItems((prevItems) => {
      // checking new value is already exist or not
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );

      //   Find if the Item Already Exists
      const existingItem = prevItems[existingItemIndex];
      let updatedItems;
      if (existingItem) {
        const updatingItemQuantity = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        // Creating a Copy of the Previous Items Array
        updatedItems = [...prevItems];
        // Replacing the Existing Item with the Updated Item:
        updatedItems[existingItemIndex] = updatingItemQuantity;
      } // if id not matched then add new one with quantity 1 as default
      else {
        updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
      }
      return updatedItems;
    });
  };

  const handleRemoveItems = (id) => {
    setItems((prevItems) => {
      // Find if the item exists in the cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === id);
      const existingItem = prevItems[existingItemIndex];

      let updatedItems;

      if (existingItem) {
        // Check if the item's quantity is greater than 1
        if (existingItem.quantity > 1) {
          // Decrease the quantity by 1
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          // Remove the item from the cart if the quantity is 1 or less
          updatedItems = prevItems.filter((item) => item.id !== id);
        }
      } else {
        // No update needed if the item does not exist
        updatedItems = [...prevItems];
      }

      return updatedItems;
    });
  };

  const handleClearCart = () => {
    setItems([]);
  };

  const cartValues = {
    items,
    addItems: handleAddItems,
    removeItems: handleRemoveItems,
    clearCart: handleClearCart,
  };

  console.log("items", cartValues.items);

  return (
    <CartContext.Provider value={cartValues}>{children}</CartContext.Provider>
  );
}

export default CartContext;

// handle add and quantity logic explanation

{
  /*
 Check for Existing Item: It first checks if the newItem already exists in the cart by searching for an item with the same id in the current state (prevItems). This is done using findIndex, which returns the index of the item if found, or -1 if not.

Item Exists: If the item is found (existingItemIndex is not -1), it creates a new item (updatedItem) with the same properties as the existing item but increments the quantity by 1.

Update the Cart: If the item exists, the new updatedItem replaces the old item in the updatedItems array (which is a copy of prevItems). This ensures the cart reflects the new quantity of the added item.

Item Does Not Exist: If the item does not exist (existingItemIndex is -1), it adds newItem to the cart with a default quantity of 1.

State Update: Finally, it updates the items state with the new updatedItems array, either containing the new item or the updated existing item.
 */
}
