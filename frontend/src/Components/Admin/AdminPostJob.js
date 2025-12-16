import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setCompanies } from "../redux/companySlice";
import "./AdminPostJob.css";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../redux/authSlice";

function AdminPostJob() {
  const dispatch = useDispatch();
  const [postLoading, setPostLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
 const navigate=useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    Salary: "",
    location: "",
    jobType: "",
    exprinceLevel: "",
    position: 0,
    companyId: "",
  });

  

  
  useEffect(() => {
    const fetchCompanies = async () => {
 
      try {
        const res = await axios.get("http://localhost:8000/api/v1/company/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Error fetching companies:", error.response?.data || error.message);
      }
    };
    fetchCompanies();
  }, [dispatch]);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });

  };

  const selectChange = (e) => {
    const selectedCompany = companies.find(
      (company) => company._id === e.target.value
    );
    if (selectedCompany) {
      setJobData({
        ...jobData,
        companyId: selectedCompany._id,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobData.companyId) {
      toast.error("Please select a company!");
      return;
    }
   
setPostLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/job/post",
        jobData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Reset form
        setJobData({
          title: "",
          description: "",
          requirements: "",
          Salary: "",
          location: "",
          jobType: "",
          exprinceLevel: "",
          position: 0,
          companyId: "",
        });
        navigate("/admin/jobs")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    
    finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="postjob_cnt">
      <h2>Post New Job</h2>

      <form onSubmit={handleSubmit} className="postjob_form">
        <div className="postjob_field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            placeholder="Enter job title"
            onChange={handleChange}
          />
        </div>

        <div className="postjob_field">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={jobData.description}
            placeholder="Enter job description"
            onChange={handleChange}
          />
        </div>

        <div className="postjob_field">
          <label>Requirements (comma separated)</label>
          <input
            type="text"
            name="requirements"
            value={jobData.requirements}
            placeholder="React, Node, Express"
            onChange={handleChange}
          />
        </div>

        <div className="postjob_field">
          <label>Salary</label>
          <input
            type="text"
            name="Salary"
            value={jobData.Salary}
            placeholder="Enter salary"
            onChange={handleChange}
          />
        </div>

        <div className="postjob_field">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            placeholder="Enter location"
            onChange={handleChange}
          />
        </div>

        <div className="postjob_field">
          <label>Job Type</label>
          <select name="jobType" value={jobData.jobType} onChange={handleChange}>
            <option value="">Select Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>

        <div className="postjob_field">
          <label>Experience Level</label>
          <input
            type="text"
            name="exprinceLevel"
            value={jobData.exprinceLevel}
            placeholder="Enter experience"
            onChange={handleChange}
          />
        </div>

        <div className="postjob_field">
          <label>No of Positions</label>
          <input
            type="number"
            name="position"
            value={jobData.position}
            placeholder="Enter number of positions"
            onChange={handleChange}
          />
        </div>

        {companies.length !== 0 ? (
          <div className="postjob_field">
            <label>Select Company</label>
            <select value={jobData.companyId} onChange={selectChange}>
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="warning_text">
            Please register a company first before posting a job
          </p>
        )}

   <button type="submit" disabled={postLoading}>
  {postLoading ? "Loading..." : "Post Job"}
</button>


      
      </form>
    </div>
  );
}

export default AdminPostJob;
