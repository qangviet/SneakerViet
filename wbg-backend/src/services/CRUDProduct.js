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
        for (const image of data.files["images"]) {
            images.push(image.path);
        }
        let model = data.files["model3D"][0].path;
        model = JSON.stringify(model);
        let str_images = JSON.stringify(images);
        const [r1, f1] = await connection.query(
            `insert into product values
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
                model,
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
// Get Product for view Admin
const getAllProducts = async () => {
    try {
        let [r1, f1] = await connection.query(
            `select code, name, brand_name, ctg_name, color, price, discount as sale, visibility, images
            from product`
        );
        let dt = [];
        for (const result of r1) {
            result.images = JSON.parse(result.images);
            let stock = [];
            let total_stock = 0;
            result.color = JSON.parse(result.color);
            let cl = result.color.name;
            for (const sq of result.color.size_quan) {
                stock.push({
                    size: sq.size,
                    quantity: parseInt(sq.quantity),
                });
                total_stock += parseInt(sq.quantity);
            }
            let sold = [];
            let total_sold = 0;
            let [r2, f2] = await connection.query(
                `select size_quantity, revenue from sold
                where pCode = ?`,
                [result.code]
            );
            for (const s of r2) {
                let sq = JSON.parse(s.size_quantity);
                sq.quantity = parseInt(sq.quantity);
                s.revenue = parseInt(s.revenue);
                total_sold += sq.quantity;
                let chk = false;
                for (let i = 0; i < sold.length; i++) {
                    if (sold[i].size === sq.size) {
                        sold[i].quantity += sq.quantity;
                        sold[i].revenue += s.revenue;
                        chk = true;
                    }
                }
                if (!chk) {
                    sold.push({
                        size: sq.size,
                        quantity: sq.quantity,
                        revenue: s.revenue,
                    });
                }
            }
            dt.push({
                code: result.code,
                name: result.name,
                price: result.price,
                brand: result.brand_name,
                category: result.ctg_name,
                sale: result.sale,
                status: result.visibility,
                img: result.images[0],
                stock: {
                    total: total_stock,
                    details: stock,
                },
                sold: {
                    total: total_sold,
                    details: sold,
                },
                color: cl,
            });
        }
        return {
            EM: "Get all products successfully",
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

const getModelPath = async (code) => {
    try {
        let [r1, f1] = await connection.query(`select model3d from product where code = ?`, [code]);
        return r1[0].model3d;
    } catch (error) {
        console.log(error);
    }
};

const adjustPrice = async (data) => {
    try {
        let code = data.code;
        let price = data.price;
        let discount = data.sale;
        let [r1, f1] = await connection.query(
            `update product
            set price = ?, discount = ?
            where code = ?`,
            [price, discount, code]
        );
        return {
            EM: "Adjust price successfully",
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
const adjustQuantity = async (data) => {
    try {
        let code = data.code;
        let color = data.color;
        color = JSON.stringify(color);
        await connection.query(
            `update product
            set color = ?
            where code = ?`,
            [color, code]
        );
        return {
            EM: "Adjust quantity successfully",
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

const hideProduct = async (data) => {
    try {
        await connection.query(
            `update product 
            set visibility = ?
            where code = ?`,
            [data.type, data.code]
        );
        return {
            EM: "Hide product successfully",
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
export {
    getBrandCategory,
    createProduct,
    getProductCard,
    getModelPath,
    getProductDetail,
    getAllProducts,
    adjustPrice,
    adjustQuantity,
    hideProduct,
};
