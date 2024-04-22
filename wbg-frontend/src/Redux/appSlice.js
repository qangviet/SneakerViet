import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isLoadding: false,
    },
    reducers: {
        setLoadding: (state, action) => {
            state.isLoadding = action.payload;
        },
    },
});

export const { setLoadding } = appSlice.actions;
export default appSlice.reducer;
