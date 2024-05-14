import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        contentPage: "",
    },
    reducers: {
        setContentPage: (state, action) => {
            state.contentPage = action.payload;
        },
    },
});

export const { setContentPage } = adminSlice.actions;
export default adminSlice.reducer;
