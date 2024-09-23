// const connection = require("../database/db")
const createConnection = require("../database/db")
const product = {}

product.insertProductDetails = async (req, res) => {
    const connection = await createConnection()
    try {
        const payload = req.body
        if (
            typeof payload.product_name !== "string" ||
            typeof payload.category_id !== "number" ||
            typeof payload.product_price !== "number"
        ) {
            return res.status(400).send({ code: 400, status: "pending", message: "invalid input" })
        }
        const [rslt] = await connection.query(`insert into product_details(product_name,category_id,product_price) values ('${payload.product_name}','${payload.category_id}','${payload.product_price}')`)
        if ([rslt].affectedRows === 0) {
            res.status(400).send({ code: 200, status: "pending", message: "can not be inserted" })
        }
        res.status(200).send({ code: 200, status: "success", message: "successfully inserted product details", data: rslt })
    } catch (e) {
        res.status(500).send({ code: 500, status: "failure", message: "something went wrong" + e })
    }
}

product.getProductDetails = async (req, res) => {
    const connection = await createConnection()
    try {
        const [rslt] = await connection.query(`select * from product_details`)
        if (rslt.length === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "error in getting the details" })
        }
        res.status(200).send({ code: 200, status: "success", message: "successfully get the product details" })
    } catch (e) {
        res.status(500).send({ code: 500, status: "failure", message: "something went wrong" + e })
    }
}

product.getAllProductDetails = async (req, res) => {
    const connection = await createConnection()
    try {
        const [rslt] = await connection.query(`select * from product_details left join category_details on product_details.category_id=category_details.category_id`)
        if (rslt.length === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "error in getting the details"})
        }
        var o = {}
        var frslt = rslt.reduce((r, el) => {
            if (!o[el]) {
                o[el] = {
                    category_id: el.category_id,
                    category_name: el.category_name,
                    products: []
                }
                r.push(o[el])
            }
            o[el].products.push({ product_id: el.product_id, product_name: el.product_name, product_price: el.product_price })
            return r;
        }, [])
        res.status(200).send({ code: 200, status: "success", message: "successfully get the details", data: frslt })
    } catch (e) {
        res.status(500).send({ code: 500, status: "error", message: "something went wrong" + e })
    }
}

module.exports = product