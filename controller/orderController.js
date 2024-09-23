const createConnection = require("../database/db")

const order = {}


order.createOrder = async (req, res) => {
    const connection = await createConnection()
    try {
        await connection.beginTransaction();
        const [user] = await connection.query(`SELECT id FROM user_details WHERE id =${req.body.user_id}`);
        console.log("user:", user);
        if (user.length !== 1) {
            res.status(400).send({ code: 400, status: "pending", message: "user does not exist" })
        }
        const [cart] = await connection.query(`select * from cart_details where cart_status=1 and user_id=${req.body.user_id}`)
        if (cart.length === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "error in cart details" })
        }
        const in_number = "abd" + req.body.user_id
        const [order] = await connection.query(`insert into order_details (user_id,invoice_number,order_status) values (${req.body.user_id},"${in_number}",1)`)
        if ([order].affectedRows === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "error while creating order" })
        }
        const [upcart] = await connection.query(`update cart_details set cart_status=3 where cart_status=1`)
        if (upcart.affectedRows === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "error while updating" })
        }
        await connection.commit()
        res.status(200).send({ code: 200, status: "success", message: "ordered successfully" })
    } catch (error) {
        await connection.rollback();
        res.status(500).send({ code: 500, status: "failure", message: "Something went wrong: " + error.message });
    } finally {
        await connection.end();
    }
}



module.exports = order

