import React, { useEffect } from "react";
import HomePage from "./HomePage/homePage";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Login from "./Login/login";
import Register from "./Login/register";
import ProfilePage from "./ProfilePage/profilePage";
import ProductPage from "./ProductPage/productPage";
import AdminPage from "./AdminPage/adminPage";

import CheckOut from "./CheckOut/checkOut";
import Modal from "react-modal";
import CheckOut2 from "./CheckOut/checkOut2";
import LoaddingSpiner from "./Loadding/loadding";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoadding } from "./Redux/appSlice";
import SearchPage from "./SearchPage/searchPage";

const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 5,
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
    },
};
Modal.setAppElement("#root");
function AllRouter() {
    const loadding = useSelector((state) => state.app.isLoadding);
    const dispatch = useDispatch();
    return (
        <>
            <Modal
                isOpen={loadding}
                onRequestClose={() => dispatch(setLoadding(false))}
                style={customStyles}
            >
                <div className="flex justify-center items-center w-full h-[100vh]">
                    <LoaddingSpiner />
                </div>
            </Modal>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="/checkout/next" element={<CheckOut2 />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default AllRouter;
