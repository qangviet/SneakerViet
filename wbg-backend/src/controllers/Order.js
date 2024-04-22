import { creatOrder, getOrder } from "../services/CRUDOrder";

const handleCreateOrder = async (req, res) => {
    try {
        let data = await creatOrder(req.body);
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

const handleGetOrder = async (req, res) => {
    try {
        let data = await getOrder(req.body);
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

export { handleCreateOrder, handleGetOrder };
