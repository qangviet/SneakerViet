import { getInfor } from "../services/CRUDProfile";

const getProfile = async (req, res) => {
    try {
        let data = await getInfor(req.body);
        return res.status(200).json({
            EM: "Get profile successfully",
            EC: "0",
            DT: data,
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

module.exports = {
    getProfile,
};
