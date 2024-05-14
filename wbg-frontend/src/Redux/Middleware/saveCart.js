import Cookies from "js-cookie";

const saveCartStateMiddleware = (store) => (next) => (action) => {
    const result = next(action); // Thực hiện action

    // Lưu trạng thái "cart" vào cookie
    const cartState = store.getState().cart;
    sessionStorage.setItem("cartState", JSON.stringify(cartState));

    return result;
};

export default saveCartStateMiddleware;
