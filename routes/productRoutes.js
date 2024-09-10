import express from "express";
import Razorpay from "razorpay";
import cors from 'cors'
import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

import formidable from "express-formidable";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, paymentvalidatecontroller, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, razorpaypaymentController, realtedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
const router =express.Router()

// routes

// create products
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
  );

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//update product routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
  
  //filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

// payments 

router.post("/order",requireSignIn,razorpaypaymentController)

router.post("/validate",paymentvalidatecontroller)


export default router