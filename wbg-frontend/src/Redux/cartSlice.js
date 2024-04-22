import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [
            // {
            //     code: "",
            //     name: "",
            //     price: 0,
            //     size: 0,
            //     quantity: 0,
            //     image: "",
            //     color: "",
            // },  maxquan: "",
            // },
        ],
        isOpen: false,
        isLoadding: false,
    },
    reducers: {
        addtoCart: (state, action) => {
            for (let i = 0; i < state.products.length; i++) {
                if (
                    state.products[i].code === action.payload.code &&
                    state.products[i].size === action.payload.size &&
                    state.products[i].color === action.payload.color
                ) {
                    state.products[i].quantity += action.payload.quantity;
                    return;
                }
            }
            state.products.push(action.payload);
        },
        openCart: (state, action) => {
            state.isOpen = true;
        },
        closeCart: (state, action) => {
            state.isOpen = false;
        },
        setLoadding: (state, action) => {
            state.isLoadding = action.payload;
        },
        decrease: (state, action) => {
            let index = action.payload;
            if (state.products[index].quantity > 1) state.products[index].quantity--;
        },
        increase: (state, action) => {
            let index = action.payload;
            if (state.products[index].quantity < state.products[index].maxquan)
                state.products[index].quantity++;
            else {
                alert("Số lượng sản phẩm đã đạt giới hạn");
            }
        },
        remove: (state, action) => {
            state.products.splice(action.payload, 1);
        },
    },
});

export const { addtoCart, openCart, closeCart, setLoadding, decrease, increase, remove } =
    cartSlice.actions;
export default cartSlice.reducer;
