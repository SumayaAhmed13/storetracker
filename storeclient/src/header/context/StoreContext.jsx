import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [basket, setbasket] = useState(null);

  function removeItem(productId, quantity=1) {
    if (!basket) return;

    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setbasket((preState) => {
        return {
          ...preState,
          items,
        };
      });
    }
  }

  return(
    <StoreContext.Provider value={{basket, setbasket,removeItem}}>
         {children}
    </StoreContext.Provider>
  )
};
