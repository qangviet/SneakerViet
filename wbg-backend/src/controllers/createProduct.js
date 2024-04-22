import { getBrandCategory, createProduct } from "../services/CRUDProduct";

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
        return res.status(500).json({
            EM: "Internal server error",
            EC: "-1",
            DT: "",
        });
    }
};
export { getBrands, handleCreateProduct };
