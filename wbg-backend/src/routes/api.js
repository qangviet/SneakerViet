//Method render
import express from "express";
import multer from "multer";
const path = require("path");

import { getProfile } from "../controllers/EditProfile";
import { handleLogin, handleRegister } from "../controllers/Login";
import { getBrands, handleCreateProduct } from "../controllers/createProduct";
import { getProduct } from "../controllers/getProduct";
import { handleCreateOrder, handleGetOrder } from "../controllers/Order";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "images", "upload"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

const initApiRoutes = (app) => {
    //LOGIN
    router.post("/register", handleRegister);
    router.post("/login", handleLogin);
    router.post("/profile", getProfile);

    //PRODUCT
    router.get("/get-brands", getBrands);
    router.post("/add-product", upload.array("images"), handleCreateProduct);
    router.post("/get-products", getProduct);

    //ORDER
    router.post("/create-order", handleCreateOrder);
    router.post("/get-order", handleGetOrder);
    return app.use("/api", router);
};

export default initApiRoutes;
