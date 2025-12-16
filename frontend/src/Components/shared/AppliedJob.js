import "./AppliedJobs.css";
import UseAppliedjobs from "../Hooks/UseGetuserjob";

function AppliedJob() {
  const { appliedJobs = [], loading } = UseAppliedjobs();

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <div className="Applied_Job">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Job Role</th>
            <th>Company</th>
            <th className="status_job">Status</th>
          </tr>
        </thead>

        <tbody>
          {appliedJobs.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No applied jobs found
              </td>
            </tr>
          ) : (
            appliedJobs.map((job) => (
              <tr key={job._id}>
                <td data-label="Date">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>

                <td data-label="Job Role">
                  {job.job?.title || "N/A"}
                </td>

                <td data-label="Company">
                  {job.job?.company?.name || "N/A"}
                </td>

                <td
                  data-label="Status"
                  className={`status_${job.status}`}
                >
                  {job.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJob;
