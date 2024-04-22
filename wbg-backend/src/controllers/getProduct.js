import { getProductCard, getProductDetail } from "../services/CRUDProduct.js";
const fs = require("fs");

const getProduct = async (req, res) => {
    try {
        let data;
        if (req.body.type === "for-card") {
            data = await getProductCard();
            //console.log(data);
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

module.exports = {
    getProduct,
};
