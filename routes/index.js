const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")
const categoryController=require("../controller/categoryController")
const productController=require("../controller/productController")
const cartController =require("../controller/cartController")
const orderController=require("../controller/orderController")

router.route("/").get((req,res)=>{
    res.status("200").send("success")
})

//user controller
router.route("/form").get(userController.form)
router.route("/registration").post(userController.registration)
router.route("/login").post(userController.login)

//category controller
router.route("/insertCategory").post(categoryController.insertCategory)
router.route("/getCategoryDetails").get(categoryController.getCategoryDetails)

//product controller
router.route("/insertProductDetails").post(productController.insertProductDetails)
router.route("/getProductDetails").get(productController.getProductDetails)
router.route("/getAllProductDetails").get(productController.getAllProductDetails)

//cart controller
router.route("/AddToCart").post(cartController.AddToCart)

//order controller

router.route("/createOrder").post(orderController.createOrder)


module.exports=router