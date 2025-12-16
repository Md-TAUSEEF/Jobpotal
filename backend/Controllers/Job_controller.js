import {Job} from "../modules/job_modules.js";


//for admin
const postJob=async(req,res)=>{
    try{
        const{title, description, requirements, jobType, Salary, location,position, exprinceLevel, companyId}=req.body;
         const userId = req.id;

        if(!title ||!description ||!requirements ||!jobType ||!Salary ||!location ||!position ||!exprinceLevel ||!companyId ){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

    const job=await Job.create({
        title,description,
        requirements:requirements.split(","),
        Salary:Number(Salary),
        location,jobType,
        exprinceLevel:exprinceLevel,
        position,
        company: companyId,
        created_by:userId


    })
     return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    }catch(error){
        console.log(error);

    }
}

//for studen
const getAlljob=async(req,res)=>{
    try{
        //filter the job 
        const keyword= req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex: keyword, $options:"i"}},
                {description:{$regex: keyword, $options:"i"}}
            ]
        };

        const job=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt: -1});

        if(!job){
            return res.status(400).json({
                message:"job not found",
                success:false
            })
        };

         return res.status(200).json({
            job,
            success: true
        })

    }catch(error){
        console.log(error);
    }
}

//student serch job with id
const getJobId = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "_id name"
        }
      })
      .populate("company");

    if (!job) {
      return res.status(404).json({
        msg: "Job not found",
        success: false
      });
    }

    return res.status(200).json({
      msg: "Job found",
      job,
      success: true
    });

  } catch (error) {
    console.log(error);
  }
};


//admin ne ad tak kitna job create kiye hai
const getAdminjob = async (req, res) => {
  try {
    const adminId = req.id; // middleware se mil rahi ID

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const jobs = await Job.find({ created_by: adminId })
      .populate("company") // populate company to get name
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      job: jobs,
    });
  } catch (error) {
    console.log("Get admin job error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export{postJob,getAlljob, getJobId,getAdminjob}