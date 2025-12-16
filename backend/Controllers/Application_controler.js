import { Application } from "../modules/application_modules.js";
import { Job } from "../modules/job_modules.js";

const AppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        msg: "job id is not required",
        success: false,
      });
    }

    //check usr is allready applied or not
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        msg: "user is allready applied this job",
        success: false,
      });
    }

    //job exist karta hai ya nahi
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    //ab applied karo job(create new application)

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    //ab job create hone ke bad jobe me push kar do

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


//get allapplied job
const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;

    //find abhi tak kitnajob applied huwa hai

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
          populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
      });

    if (!application) {
      return res.status(400).json({
        msg: "no job find",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "total job listed here",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


//admin check karega kitan appplied kiya hai user posted job par
const getApplication = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // ✅ SEND APPLICATIONS ARRAY
    return res.status(200).json({
      success: true,
      applications: job.applications,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateStatus=async(req,res)=>{
    try{
       const { status } = req.body;

        const applicationId=req.params.id;

        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                msg:"Applicatin not found",
                succees:false
            })
        }

        //update status

        application.status=status.toLowerCase();
        await application.save();

          return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    }catch(error){
        console.log(error);
    }
}


export { AppliedJob,getAppliedJob,getApplication,updateStatus };
