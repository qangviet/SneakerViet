import { configureStore } from "@reduxjs/toolkit";
import saveCartStateMiddleware from "./Middleware/saveCart";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";
import productSlice from "./productSlice";
import adminSlice from "./adminSlice";
const persistedCartState = sessionStorage.getItem("cartState");
const initialState = persistedCartState
    ? JSON.parse(persistedCartState)
    : {
          products: [],
          isOpen: false,
          isLoadding: false,
      };

const store = configureStore({
    reducer: {
        cart: cartSlice,
        order: orderSlice,
        app: appSlice,
        product: productSlice,
        admin: adminSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveCartStateMiddleware),
    preloadedState: { cart: initialState },
});

export default store;
