import {
    getBrandCategory,
    createProduct,
    getModelPath,
    adjustPrice,
    adjustQuantity,
    hideProduct,
} from "../services/CRUDProduct";
import fs from "fs";
const getBrands = async (req, res) => {
    try {
        let data = await getBrandCategory();
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
const handleCreateProduct = async (req, res) => {
    try {
        let result = await createProduct(req);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT,
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
const handleDownloadModel3D = async (req, res) => {
    let pcode = req.params.pcode;
    let modelPath = await getModelPath(pcode);
    modelPath = JSON.parse(modelPath);
    let fileName = `${pcode}.glb`;

    fs.readFile(modelPath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Có lỗi xảy ra khi đọc tệp tin.");
        } else {
            res.set("Content-Type", "model/gltf-binary");
            res.set("Content-Disposition", `attachment; filename="${fileName}"`);
            res.send(data);
        }
    });
};

const handleAdjustPrice = async (req, res) => {
    try {
        let data = await adjustPrice(req.body);
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
const handleAdjustQuantity = async (req, res) => {
    try {
        let data = await adjustQuantity(req.body);
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

const handleHideProduct = async (req, res) => {
    try {
        let data = await hideProduct(req.body);
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

export {
    getBrands,
    handleCreateProduct,
    handleDownloadModel3D,
    handleAdjustPrice,
    handleAdjustQuantity,
    handleHideProduct,
};
