import React from "react";
import { useSelector } from "react-redux";
import "./JobCards.css";

function JobCards() {
  const alljobs = useSelector((store) => store?.job?.alljobs ?? []);

  return (
    <section className="jobs_section">
      <h2 className="jobs_heading">
        Latest & <span>Top Job Openings</span>
      </h2>

      <div className="jobs_grid">
        {alljobs.length === 0 ? (
          <span>No Job is there</span>
        ) : (
          alljobs.slice(0, 6).map((job) => (
            <div className="job_card" key={job._id}>
              
              <h3 className="company">
                {job.company ? job.company.name : "Company Not Assigned"}
              </h3>

              <span className="location">{job.location}</span>

              <h4 className="job_title">{job.title}</h4>
              <p className="job_desc">{job.description}</p>

              <div className="job_tags">
                <span className="tag blue">Positions: {job.position}</span>
                <span className="tag red">{job.jobType}</span>
                <span className="tag purple">₹ {job.Salary}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default JobCards;
