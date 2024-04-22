import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderID: "",
    },
    reducers: {
        setOrderID: (state, action) => {
            state.orderID = action.payload;
        },
    },
});

export const { setOrderID } = orderSlice.actions;
export default orderSlice.reducer;
