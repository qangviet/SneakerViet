import { getAllProducts, getProductCard, getProductDetail } from "../services/CRUDProduct.js";
const fs = require("fs");

const getProduct = async (req, res) => {
    try {
        let data;
        if (req.body.type === "for-card") {
            data = await getProductCard();
            for (let i = 0; i < data.DT.length; i++) {
                let image_path = data.DT[i].image;
                let image = fs.readFileSync(image_path, { encoding: "base64" });
                data.DT[i].image = image;
            }
        } else if (req.body.type === "detail") {
            data = await getProductDetail(req.body);
            for (let i = 0; i < data.DT.images.length; i++) {
                let image_path = data.DT.images[i];
                let image = fs.readFileSync(image_path, { encoding: "base64" });
                data.DT.images[i] = image;
            }
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        return res.status(500).json({
            EM: "Internal server error",
            EC: "-1",
            DT: "",
        });
    }
};
const handleAdminGetProducts = async (req, res) => {
    try {
        let data = await getAllProducts();
        for (const dt of data.DT) {
            let image_path = dt.img;
            let image = fs.readFileSync(image_path, { encoding: "base64" });
            dt.img = image;
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Internal server error",
            EC: "-1",
            DT: "",
        });
    }
};

export { getProduct, handleAdminGetProducts };
