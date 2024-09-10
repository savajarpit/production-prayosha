import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createcategoryController,updatecategoryController,categoryControlller,singleCategoryController,deleteCategoryCOntroller, getusercountcontroller} from '../controllers/categoryController.js'
const router =express.Router()

// routes
// create category
router.post('/create-category',requireSignIn,isAdmin,createcategoryController)

// update category
router.put('/update-category/:id',requireSignIn,isAdmin,updatecategoryController)

//getAll category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
  );
 
// user count router
router.get("/user-counts",requireSignIn,isAdmin,getusercountcontroller)  

export default router