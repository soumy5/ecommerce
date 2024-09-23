// const connection = require("../database/db")
const createConnection = require("../database/db")
const category = {}

//for admin
category.insertCategory = async (req, res) => {
    const connection = await createConnection()
    try {
        const payload = req.body
        if (
            typeof payload.category_name !== "string"
        ) {
            return res.status(400).send({ code: 400, status: "pending", message: "invalid input" })
        }
        const [rslt] = await connection.query(`insert into category_details(category_name) values ('${payload.category_name}')`)
        if ([rslt].affedtedRows === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "can not be inserted" })
        }
        res.status(200).send({ code: 200, status: "success", message: "successfully inserted category details", data: rslt })
    } catch (e) {
        res.status(500).send({ code: 500, status: "failure", message: "something went wrong" + e })
    }
}

//for both admin and user
category.getCategoryDetails = async (req, res) => {
    const connection = await createConnection()
    try {
        const [rslt] = await connection.query(`select * from category_details`)
        if (rslt.length === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "can not get the details" })
        }
        res.status(200).send({ code: 200, status: "success", message: "successfully got the category details", data: rslt })
    } catch (e) {
        res.status(500).send({ code: 500, status: "failure", message: "something went wrong" + e })
    }
}

module.exports = category