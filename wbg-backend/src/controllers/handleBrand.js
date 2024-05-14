import { addNewBrand, getAllBrands } from "../services/CRUDBrand";

const handleGetAllBrands = async (req, res) => {
    try {
        let data = await getAllBrands();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Database is encountering an error",
            EC: "-1",
            DT: "",
        });
    }
};

const handleAddNewBrand = async (req, res) => {
    try {
        let data = await addNewBrand(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Database is encountering an error",
            EC: "-1",
            DT: "",
        });
    }
};

export { handleGetAllBrands, handleAddNewBrand };
