import connection from "../config/database";

const creatOrder = async (data) => {
    try {
        await connection.query(
            `insert into orders (id, name, email, phone, delivery, address, products, dateOrder, status)
            values (?, ?, ?, ?, ?, ?, ?, ?, "pending")`,
            [
                data.id,
                data.name,
                data.email,
                data.phone,
                data.deliveryMethod,
                data.address,
                JSON.stringify(data.products),
                data.date,
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
        console.log(r1);
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

export { creatOrder, getOrder };
