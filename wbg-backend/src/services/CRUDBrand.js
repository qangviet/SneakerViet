import connection from "../config/database";

const getAllBrands = async () => {
    try {
        let [r1, f1] = await connection.query(
            `select * 
            from brand`
        );
        let data = [];
        for (const brand of r1) {
            let [r2, f2] = await connection.query(
                `select count(code) as count 
                from product where brand_name = ?`,
                [brand.name]
            );
            data.push({
                name: brand.name,
                categories: brand.categories,
                count: r2[0].count,
            });
        }
        return {
            EM: "Get all brands successfully",
            EC: "0",
            DT: data,
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

const addNewBrand = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `insert into brand (name, categories) values (?, ?)`,
            [data.name, "[]"]
        );
        return {
            EM: "Add new brand successfully",
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

export { getAllBrands, addNewBrand };
