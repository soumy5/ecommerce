const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const route=require("./routes")
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use("/",route)


app.listen(3000,()=>{
    console.log("server is running on the port",3000);
    
})