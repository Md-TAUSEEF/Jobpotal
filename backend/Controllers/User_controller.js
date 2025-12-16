import { User } from "../modules/user_modules.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../util/DataUriParser.js";
import cloudinary from "../util/Cloudinary.js";

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }



    //impliment cloudinary
    const file=req.file
    const fileUri=getDataUri(file);
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content)


    // ✅ hash password
    const hashPassword = await bcrypt.hash(password, 10);

   
   

    // ✅ create user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile: {
       profilePhoto:cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Something went wrong during registration",
      success: false,
    });
  }
};


//login

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

   


    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }



    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "incorrect email and password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "incorrect email and password",
        status: false,
      });
    }

    //check role of user

    if (role !== user.role) {
      return res.status(400).json({
        message: "user role is not match",
        status: false,
      });
    }

    //generate the token

        const tokenData = {
            userId: user._id
        }

      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    //store token in cookies

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "this error is coming when login page is making",
      success: false,
    });
  }
};

//logout

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout sucessfully",
      success: true,
    });
  } catch (error) {
    console.log("this error is coming when user is logout");
    return res.status(400).json({
      message: "this error is coming in logout form",
      success: false,
    });
  }
};

//update profile
const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    // convert skills into array
    let skillArray;
    if (skills) {
      skillArray = skills.split(",");
    }

    const userId = req.id; // from auth middleware
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // ✅ update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillArray;

    // ✅ file upload (only if file exists)
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content
      );

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error updating profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { register, login, logout, updateProfile };
