import connection from "../config/database";

const getInfor = async (email) => {
    try {
        let [r1, f1] = connection.query(`select * from user where email = ?`, [email]);
        return {
            EM: "Get profile successfully",
            EC: "0",
            DT: r1[0],
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Database is encountering an error",
            EC: "-1",
            DT: "",
        };
    }
};

module.exports = {
    getInfor,
};
