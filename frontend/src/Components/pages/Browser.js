import { useSelector } from "react-redux";
import Job from "./Job";
import "./Browser.css";

function Browser() {
  const { alljobs, searchquery } = useSelector((state) => state.job);

  const filteredJobs = alljobs.filter((job) =>
    job.title.toLowerCase().includes(searchquery.toLowerCase())||
  job.location?.toLowerCase().includes(searchquery.toLowerCase())
  );

  return (
    <div className="browser_cnt">
      <div className="browser_header">
        <h1>Search Result ({filteredJobs.length})</h1>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        filteredJobs.map((job) => (
          <div className="Browser_job" key={job._id}>
            <Job job={job} />
          </div>
        ))
      )}
    </div>
  );
}

export default Browser;
