// //mysql connection through knex query builder
// const mysql=require("mysql")

// const connection=mysql.createConnection({
//     user:"root",
//     host:"localhost",
//     database:"ecommerce",
//     password:""
// })

// connection.connect()

// module.exports=connection


const mysql=require("mysql2/promise")

async function createConnection(){
    const conn=await mysql.createConnection({
        user:"root",
        host:"localhost",
        database:"ecommerce",
        password:""
    })
    return conn
}

module.exports=createConnection;

