import { IoSave } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Job.css";
function Job({ job }) {
  const navigate = useNavigate();

  //calculate the time
  const JobTime = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const calculateTime = currentTime - createdAt; 
    return Math.floor(calculateTime / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <div className="job_cnt">
        <div className="job_mid">
          <div className="job_left">
            <p>{JobTime(job?.createdAt)} </p>
          </div>
          <div className="job_save">
            <IoSave />
          </div>
        </div>

        <div className="job_mid2">
          <img src={job?.company?.logo} alt="company logo" />

          <div className="job_mid22">
            <h3>{job?.company?.name}</h3>
            <p>{job?.location}</p>
          </div>
        </div>

        <div className="job_ftr">
          <h1>{job?.title}</h1>
          <p>{job?.description}</p>
        </div>

        <div className="job_tags">
          <span className="tag blue">{job?.position}</span>
          <span className="tag red">{job?.jobType}</span>
          <span className="tag purple">{job?.Salary}</span>
        </div>

        <div className="job_actions">
          <button
            type="button"
            onClick={() => navigate(`/description/${job?._id}`)}
          >
            Details
          </button>
          <button type="button">Save for later</button>
        </div>
      </div>
    </>
  );
}

export default Job;
