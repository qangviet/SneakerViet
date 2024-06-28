import connection from "../config/database";

const creatOrder = async (data) => {
    try {
        await connection.query(
            `insert into orders (id, name, email, phone, delivery, paymentMethod, address, products, dateOrder, status, total)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, "Đợi thanh toán", ?)`,
            [
                data.id,
                data.name,
                data.email,
                data.phone,
                data.deliveryMethod,
                data.paymentMethod,
                data.address,
                JSON.stringify(data.products),
                data.date,
                data.total,
            ]
        );
        return {
            EM: "Create order successfully",
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

const getOrder = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select id, name, email, phone, delivery, address, dateOrder, status
            from orders
            where id = ?`,
            [data.odID]
        );
        let dt = {
            id: r1[0].id,
            name: r1[0].name,
            email: r1[0].email,
            phone: r1[0].phone,
            delivery: r1[0].delivery,
            address: r1[0].address,
            dateOrder: r1[0].dateOrder,
            status: r1[0].status,
        };
        return {
            EM: "Get order successfully",
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
const getAllOrders = async () => {
    try {
        let [r1, f1] = await connection.query(
            `select id, name, email, phone, delivery, paymentMethod, address, dateOrder, status, total
            from orders`
        );
        let dt = [];
        for (const result of r1) {
            dt.push({
                id: result.id,
                name: result.name,
                email: result.email,
                phone: result.phone,
                delivery: result.delivery,
                paymentMethod: result.paymentMethod,
                address: result.address,
                dateOrder: result.dateOrder,
                status: result.status,
                total: result.total,
            });
        }
        return {
            EM: "Get all orders successfully",
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
const updateOrder = async (data) => {
    try {
        let orderID = data.data.orderID;
        let status = data.data.status;
        let [r1, f1] = await connection.query(
            `select status
            from orders
            where id = ?`,
            [orderID]
        );
        if (r1[0].status === "Thành công") {
            return {
                EM: "Đơn hàng đã thành công, không thể cập nhật!",
                EC: "1",
                DT: "",
            };
        } else if (r1[0].status === "Đã hủy") {
            return {
                EM: "Đơn hàng đã hủy, không thể cập nhật!",
                EC: "1",
                DT: "",
            };
        }
        if (status === "Thành công") {
            let [r2, f2] = await connection.query(
                `select products from orders
                where id = ?`,
                [orderID]
            );
            let products = JSON.parse(r2[0].products);
            console.log(products);
            for (const product of products) {
                let [r3, f3] = await connection.query(
                    `select color from product
                    where name = ?`,
                    [product.name]
                );
                let color = JSON.parse(r3[0].color);
                console.log(color);
                for (const s_q of color.size_quan) {
                    if (s_q.size === product.size) {
                        s_q.quantity = parseInt(s_q.quantity) - parseInt(product.quantity);
                    }
                }
                await connection.query(
                    `update product
                    set color = ?
                    where name = ?`,
                    [JSON.stringify(color), product.name]
                );
                const [r4, f4] = await connection.query(
                    `select code from product
                    where name = ?`,
                    [product.name]
                );
                let sq = {
                    price: product.price,
                    size: product.size,
                    quantity: product.quantity,
                    color: product.color,
                };
                let revenue = product.price * product.quantity;
                let code = r4[0].code;
                await connection.query(
                    `insert into sold 
                    values(?, ?, ?, ?)`,
                    [code, JSON.stringify(sq), revenue, orderID]
                );
            }
        }
        await connection.query(
            `update orders
            set status = ?
            where id = ?`,
            [status, orderID]
        );
        return {
            EM: "Update order successfully",
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
export { creatOrder, getOrder, getAllOrders, updateOrder };
