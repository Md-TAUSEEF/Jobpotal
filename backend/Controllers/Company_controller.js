import {Company} from "../modules/company_modules.js";
import getDataUri from "../util/DataUriParser.js";
import cloudinary from "../util/Cloudinary.js";

//create company 
const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//whose create company informatioin

const getCompany=async(req,res)=>{
    try{
        const userId=req.id //login user id

        const companies = await Company.find({ userId });
        if(!companies){
            return res.status(400).json({
                message:"Company is not created (not found)",
                success:false
            })
        }

      return  res.status(200).json({
        companies,
        success:true

        })
    }catch (error) {
        console.log(error);
    }
}

//get company id seacrh with company name

const getCompapnyId = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      company,
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
}


//update the company information
const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    let updateData = {
      name,
      description,
      website,
      location
    };

    // ✅ If logo file exists
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export { registerCompany,getCompany,getCompapnyId,updateCompany };
