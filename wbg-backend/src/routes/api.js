//Method render
import express from "express";
import multer from "multer";
const path = require("path");

import { getProfile } from "../controllers/EditProfile";
import { handleLogin, handleRegister } from "../controllers/Login";
import {
    getBrands,
    handleAdjustPrice,
    handleAdjustQuantity,
    handleCreateProduct,
    handleDownloadModel3D,
    handleHideProduct,
} from "../controllers/createProduct";
import { getProduct, handleAdminGetProducts, handleGetModel3D } from "../controllers/getProduct";
import { handleCreateOrder, handleGetOrder, handleUpdateOrder } from "../controllers/Order";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (path.extname(file.originalname) === ".glb") {
            cb(null, path.join(__dirname, "..", "public", "model3D", "upload"));
        } else {
            cb(null, path.join(__dirname, "..", "public", "images", "upload"));
        }
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
    router.post(
        "/add-product",
        upload.fields([{ name: "images" }, { name: "model3D" }]),
        handleCreateProduct
    );
    router.post("/get-products", getProduct);
    router.get("/admin/get-products", handleAdminGetProducts);
    router.get("/download-model3d/:pcode", handleDownloadModel3D);
    router.post("/admin/edit-price", handleAdjustPrice);
    router.post("/admin/edit-quantity", handleAdjustQuantity);
    router.post("/admin/hide-product", handleHideProduct);
    //API: http://localhost:8088/api/
    //ORDER
    router.post("/create-order", handleCreateOrder);
    router.post("/get-order", handleGetOrder);
    router.post("/update-order", handleUpdateOrder);
    return app.use("/api", router);
};

export default initApiRoutes;
