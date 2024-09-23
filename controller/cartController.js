const cart = {}
const createConnection = require("../database/db")

cart.AddToCart = async (req, res) => {
    const connection = await createConnection()
    try {
        const [user] = await connection.query(`select id from user_details where id='${req.body.user_id}'`)
        if (user.length !== 1) {
            res.status(400).send({ code: 400, status: "pending", message: "user does not exist" })
        }
        const [rslt] = await connection.query(`insert into cart_details (user_id,product_id,qty,cart_status) values ('${req.body.user_id}','${req.body.product_id}','${req.body.quantity}',1)`)
        if ([rslt].affectedRows === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "error in add to cart" })
        }
        res.status(200).send({ code: 200, status: "success", message: "added to cart", data: rslt })
    } catch (e) {
        res.status(500).send({ code: 500, status: "failure", message: "something went wrong" + e })
    }
}



module.exports = cart