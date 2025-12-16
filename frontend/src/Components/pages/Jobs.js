import { useState } from "react";
import FilterJobs from "./FilterJobs";
import Job from "./Job";
import "./Jobs.css";
import { useSelector } from "react-redux";

const Jobs = () => {
  const [showFilter, setShowFilter] = useState(false);

  const alljobs = useSelector((store) => store?.job?.alljobs || []);

  return (
    <>
      <div className="mobile_filter_btn">
        <button onClick={() => setShowFilter(true)}>☰ Filter</button>
      </div>

      <div className="Jobs_cnt">
        <div className={`Jobs_cntleft ${showFilter ? "open" : ""}`}>
          <span className="close_btn" onClick={() => setShowFilter(false)}>
            ✕
          </span>
          <FilterJobs />
        </div>

        <div className="Jobs_cntright">
          {alljobs.length === 0 ? (
            <h1>Job is not found</h1>
          ) : (
            alljobs.map((job) => (
              <div className="job_card" key={job?._id}>
                <Job job={job} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
