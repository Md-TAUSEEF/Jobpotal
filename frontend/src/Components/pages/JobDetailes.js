import { useParams } from "react-router-dom";
import "./JobDetailed.css";
import useSetSingleJob from "../Hooks/UsesetSinglejob";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setsingleJob } from "../redux/jobSlice";

function JobDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch single job and save to redux
  useSetSingleJob(id);

  // Get single job and user from redux
  const singleJob = useSelector((store) => store?.job?.singleJob);
  const user = useSelector((store) => store?.auth?.user);

  // Show loading while job is not fetched
  if (!singleJob?._id) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // Check if user already applied
  const isApplied = singleJob?.applications?.some(
    (app) => app.applicant === user?._id
  ) || false;

  // Apply Handler
  const applyHandler = async () => {
    try {
      const res = await axios.post(
        `https://jobpotal-673b.onrender.com/api/v1/application/apply/${id}`,
        {
          title: singleJob.title,
          description: singleJob.description,
          requirements: singleJob.requirements,
          jobType: singleJob.jobType,
          Salary: singleJob.Salary,
          location: singleJob.location,
          position: singleJob.position,
          exprinceLevel: singleJob.exprinceLevel,
          companyId: singleJob.company,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update singleJob in redux with new application
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id }
          ],
        };
        dispatch(setsingleJob(updatedSingleJob));
        toast.success("Applied Successfully!");
      }
    } catch (err) {
      console.log("Error applying job:", err);
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="Job_cnt">
      <div className="Job_cntheader">
        <div className="job_header">
          <h1>{singleJob?.title}</h1>
        </div>

        <div className="Job_headermid">
          <div className="job_headerleft">
            <p id="row1">{singleJob?.position} Positions</p>
            <p id="row2">{singleJob?.jobType}</p>
            <p id="row3">₹{singleJob?.Salary}</p>
          </div>

          <div className="Job_detailed">
            <button disabled={isApplied} onClick={applyHandler}>
              {isApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="Job_detailedftr">
        <div className="detail_row">
          <label>Role :</label>
          <p>{singleJob?.title}</p>
        </div>

        <div className="detail_row">
          <label>Experience :</label>
          <p>{singleJob?.exprinceLevel}+ Years</p>
        </div>

        <div className="detail_row">
          <label>Salary :</label>
          <p>₹{singleJob?.Salary} / Year</p>
        </div>

        <div className="detail_row">
          <label>Job Type :</label>
          <p>{singleJob?.jobType}</p>
        </div>

        <div className="detail_row">
          <label>Location :</label>
          <p>{singleJob?.location}</p>
        </div>

        <div className="detail_row">
          <label>Skills Required :</label>
          <p>{singleJob?.requirements?.join(", ")}</p>
        </div>

        <div className="detail_row">
          <label>Total Applicants </label>
          <p>{singleJob?.applications?.length}</p>
        </div>

        <div className="detail_row">
          <label>Posted Date </label>
          <p>{singleJob?.createdAt?.split("T")[0]}</p>
        </div>
      </div>

      <div className="Job_description">
        <h3>Job Description</h3>
        <p>{singleJob?.description}</p>
      </div>
    </div>
  );
}

export default JobDetailed;
