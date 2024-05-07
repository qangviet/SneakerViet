import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        path3D: `${process.env.PUBLIC_URL}/Model3D/default.glb`,
        pCodeDisplay: "",
    },
    reducers: {
        setPath3D: (state, action) => {
            state.path3D = action.payload;
        },
        setPCodeDisplay: (state, action) => {
            state.pCodeDisplay = action.payload;
        },
    },
});
export const { setPath3D, setPCodeDisplay } = productSlice.actions;
export default productSlice.reducer;
