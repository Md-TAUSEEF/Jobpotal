import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UseAdminAllJob from "../Hooks/UseGetAdminjob";
import { FiMoreVertical, FiEdit, FiEye } from "react-icons/fi";
import "./AdminJobs.css";

function AdminJobs() {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  // Fetch admin jobs
  UseAdminAllJob();

  // Get jobs from redux
  const { adminjobs } = useSelector((store) => store.job);

  console.log("Redux adminjobs 👉", adminjobs);


  const filteredJobs = (adminjobs || []).filter((job) =>
  job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
  job.title?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
     
      <div className="admin_cnt">
        <div className="admin_mid">
          <div className="filter_section">
            <input
              type="text"
              placeholder="Search company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              onClick={() =>
                navigate("/admin/jobs/create")
              }
            >
              New Jobs
            </button>
          </div>
        </div>
        <h2>A list of your recent posted companies</h2>
      </div>

      {/* Table */}
      <div className="table_wrapper">
        <table className="company_table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                return (
                  <tr key={job._id}>
                    <td>{job.company?.name}</td>
                    <td>{job.title}</td>
                   <td>
  {job.createdAt
    ? new Date(job.createdAt).toLocaleDateString()
    : "N/A"}
</td>

     

                    <td className="action_cell">
                      <FiMoreVertical
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === job._id
                              ? null
                              : job._id
                          )
                        }
                      />

                      {openMenuId === job._id && (
                        <div className="action_menu">
                          <div
                            className="action_item"
                            onClick={() =>
                              navigate(
                                `/admin/companies/${job._id}`
                              )
                            }
                          >
                            <FiEdit /> Edit
                          </div>


                           <div
                            className="action_item"
                            onClick={() =>
                              navigate(
                                `/admin/jobs/${job._id}/applicants`
                              )
                            }
                          >
                            <FiEye/> Applicants
                          </div>




                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">No Jobs Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminJobs;
