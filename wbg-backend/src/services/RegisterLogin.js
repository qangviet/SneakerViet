import connection from "../config/database";

const checkEmail = async (email) => {
    try {
        let [results, fields] = await connection.query(`select * from account where email = ?`, [
            email,
        ]);
        return results;
    } catch (error) {
        console.log(error);
    }
};

/**
 *
 * @param {fullname, username, password, phone} UserData
 * @returns
 */
const registerNewUser = async (UserData) => {
    let res = await checkEmail(UserData.email);
    if (res.length === 1) {
        return {
            EM: "Email đã tồn tại !",
            EC: "1",
            DT: "",
        };
    }
    const name = UserData.name;
    const email = UserData.email;
    const gender = UserData.gender;
    const password = UserData.password;
    const phone = UserData.phone;
    try {
        let [r1, f1] = await connection.query(
            `insert into account (email, password, role) 
            values (?, ?, ?)`,
            [email, password, "1"]
        );
        let [r2, f2] = await connection.query(
            `insert into user (name, phone, email, gender)
            values (?, ?, ?, ?)`,
            [name, phone, email, gender]
        );
        return {
            EM: "Tạo tài khoản thành công!",
            EC: "0",
            DT: "",
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
/**
 *
 * @param {username, password} UserData
 * @returns
 */
const handleUserLogin = async (UserData) => {
    let res = await checkEmail(UserData.email);
    if (res.length === 0) {
        return {
            EM: "Email hoặc password không chính xác !",
            EC: "1",
            DT: "",
        };
    }
    const password = UserData.password;
    if (res[0].password !== password) {
        return {
            EM: "Username hoặc password không chính xác !",
            EC: "1",
            DT: "",
        };
    }
    return {
        EM: "Login successfully",
        EC: "0",
        DT: {
            role: res[0].role,
        },
    };
};

module.exports = {
    registerNewUser,
    handleUserLogin,
};
