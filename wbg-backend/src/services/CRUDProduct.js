import connection from "../config/database";

const getBrandCategory = async () => {
    try {
        let [results, fields] = await connection.query(`select * from brand`);
        let brands = [];
        let categories = [];
        for (let i = 0; i < results.length; i++) {
            let name = results[i].name;
            let cates = JSON.parse(results[i].categories);
            brands.push({ name, cates });
            categories.push(...cates);
        }
        return {
            EM: "Get brand and category successfully",
            EC: "0",
            DT: {
                brands,
                categories,
            },
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

const createProduct = async (data) => {
    try {
        let code = data.body.pcode;
        let name = data.body.pname;
        let brand = data.body.pbrand;
        let category = data.body.pcategory;
        let gender = data.body.pgender;
        let price = data.body.pprice;
        let discount = data.body.pdiscount;
        let visibility = data.body.pvisibility;
        let color = data.body.colors;
        let tag = data.body.ptag;
        let images = [];
        for (const image of data.files) {
            images.push(image.path);
        }
        let str_images = JSON.stringify(images);
        const [r1, f1] = await connection.query(
            `insert into product values
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                code,
                name,
                brand,
                category,
                gender,
                color,
                price,
                discount,
                visibility,
                tag,
                str_images,
            ]
        );
        return {
            EM: "Create product successfully",
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

const getProductCard = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select code, name, price, discount, visibility, images
            from product
            where visibility = 'public'`
        );
        let dt = [];
        for (const result of r1) {
            result.images = JSON.parse(result.images);
            dt.push({
                code: result.code,
                name: result.name,
                price: result.price,
                discount: result.discount,
                visibility: result.visibility,
                image: result.images[0],
            });
        }
        return {
            EM: "Get product card successfully",
            EC: "0",
            DT: dt,
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

const getProductDetail = async (data) => {
    try {
        let code = data.code;
        let [r1, f1] = await connection.query(`select * from product where code = ?`, [code]);
        let dt = r1[0];
        dt.images = JSON.parse(dt.images);
        delete dt.visibility;
        delete dt.tag;
        return {
            EM: "Get product detail successfully",
            EC: "0",
            DT: dt,
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
    getBrandCategory,
    createProduct,
    getProductCard,
    getProductDetail,
};
