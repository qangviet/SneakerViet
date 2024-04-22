import { createSlice } from "@reduxjs/toolkit";

const adminPageSlice = createSlice({
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

export const { setContentPage } = adminPageSlice.actions;
export default adminPageSlice.reducer;
