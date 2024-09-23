const createConnection = require("../database/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const user = {}

user.form = (req, res) => {
    res.status("200").send("send successfully")
}

user.registration = async (req, res) => {
    const connection = await createConnection()
    try {
        let payload = req.body

        if (
            typeof payload.user_name !== 'string' || payload.user_name.length < 3 || payload.user_name.length > 30 ||
            typeof payload.user_password !== 'string' || payload.user_password.length < 8 ||
            typeof payload.user_mobile !== 'string' || !/^[0-9]{10}$/.test(payload.user_mobile) ||
            typeof payload.user_email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.user_email)
        ) {
            return res.status(400).send({ code: 400, status: "error", message: "Invalid input data" });
        }
        bcrypt.hash(payload.user_password, 10, async (err, upassword) => {
            if (upassword) {
                console.log("upassword:", upassword)
                const [result] = await connection.query(`insert into user_details (user_name,user_password,user_mobile,user_email) values ('${payload.user_name}','${upassword}','${payload.user_mobile}','${payload.user_email}')`)
                if ([result].affectedRows === 0) {
                    res.status(400).send({ code: 400, status: "pending", messgage: "error occured in registration, please try again" })
                }
                res.status(200).send({ code: 200, status: "success", message: "successfully registered", data: result })

            } else {
                res.status(400).send({ code: 400, status: "pending", message: "error in hasing password" })
            }
        })
    } catch (e) {
        res.status(500).send({ code: 500, status: "failuer", message: "something went wrong" })
    }
}

user.login = async (req, res) => {
    const connection = await createConnection()
    try {
        const payload = req.body
        const [udetails] = await connection.query(`select * from user_details where user_mobile=${payload.user_mobile}`)
        if (udetails.length === 0) {
            res.status(400).send({ code: 400, status: "pending", message: "your mobile number is incorrect" })
        }
        bcrypt.compare(payload.user_password, [udetails].user_password, (err, rslt) => {
            if (rslt) {
                const token = jwt.sign({ data: [udetails].user_id }, "5675", { expiresIn: '1h' })
                res.status(200).send({ code: 200, status: "success", message: "successfully logged in", token: token })
            } else {
                res.status(400).send({ code: 400, status: "pending", message: "your password is incorrect" })
            }
        })
    } catch (e) {
        res.status(500).send({ code: 500, status: "failure", message: "something went wrong", error: e })
    }
}





module.exports = user