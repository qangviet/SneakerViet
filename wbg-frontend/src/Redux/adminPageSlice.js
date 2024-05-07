import { createSlice } from "@reduxjs/toolkit";

const adminPageSlice = createSlice({
    name: "admin",
    initialState: {
        contentPage: "",
    },
    reducers: {
        setContentPage: (state, action) => {
            console.log(action.payload);
            state.contentPage = action.payload;
            console.log(state.contentPage);
        },
    },
});

export const { setContentPage } = adminPageSlice.actions;
export default adminPageSlice.reducer;
