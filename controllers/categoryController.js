import catagoryModel from "../models/catagoryModel.js";
import userModel from "../models/userModel.js";
import slugify from "slugify";
export const createcategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is require" });
    }
    const existingcategory = await catagoryModel.findOne({ name });
    if (existingcategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category Already Exists" });
    }
    const category = await new catagoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "new category created", category });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "error in category" });
  }
};

// update category

export const updatecategoryController=async(req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params 
        const category=await catagoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({success:true,message:"category updated successfully",category})
    }catch(error){
        console.log(error);
        res
          .status(500)
          .send({ success: false, error, message: "error while updating category" });
      }
}

// get all cat
export const categoryControlller = async (req, res) => {
    try {
      const category = await catagoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };

  // single category
export const singleCategoryController = async (req, res) => {
    try {
      const category = await catagoryModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };
  
  //delete category
export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await catagoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };

  export const getusercountcontroller=async(req,res)=>{
    try {
      const total = await userModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  }
