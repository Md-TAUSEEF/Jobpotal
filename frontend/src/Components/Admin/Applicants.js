import React, { useEffect, useState } from "react";
import "./Applicants.css";
import { FiMoreVertical } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "../redux/applicationSlice";
import { toast } from "react-toastify";

function Applicants() {
  const dispatch = useDispatch();
  const { id } = useParams(); // jobId

  const [openId, setOpenId] = useState(null);

  const applicants = useSelector(
    (state) => state.application?.applications || []
  );

  // 🔹 Update applicant status (ACCEPT / REJECT)
  const statusHandler = async (status, applicationId) => {
    try {
      const res = await axios.post(
        `https://jobpotal-673b.onrender.com/api/v1/application/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOpenId(null); // close popup after action
      }
    } catch (error) {
      console.log("Status update error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  // 🔹 Fetch applicants
  useEffect(() => {
    if (!id) return;

    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `https://jobpotal-673b.onrender.com/api/v1/application/${id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setApplication(res.data.applications));
        }
      } catch (error) {
        console.log(
          "Fetch applicants error:",
          error.response?.data || error
        );
      }
    };

    fetchApplicants();
  }, [dispatch, id]);

  return (
    <div className="applicants_cnt">
      <div className="applicants_mid">
        <h3>Applicants ({applicants.length})</h3>
      </div>

      <div className="applicants_footer">
        <table className="applicants_table">
          <thead>
            <tr>
              <th>Fullname</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Resume</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No applicants found
                </td>
              </tr>
            ) : (
              applicants.map((application) => (
                <tr key={application._id}>
                  <td>{application.applicant?.fullname}</td>
                  <td>{application.applicant?.email}</td>
                  <td>{application.applicant?.phoneNumber || "N/A"}</td>

                  <td>
                    {application.applicant?.profile?.resume ? (
                      <a
                        href={application.applicant.profile.resume}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>

                  <td style={{ position: "relative" }}>
                    <FiMoreVertical
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setOpenId(
                          openId === application._id
                            ? null
                            : application._id
                        )
                      }
                    />

                    {openId === application._id && (
                      <div className="applicant_pop">
                        <div
                          className="applicant_row1"
                          onClick={() =>
                            statusHandler("accepted", application._id)
                          }
                        >
                          <p>Accepted</p>
                        </div>

                        <div
                          className="applicant_row1"
                          onClick={() =>
                            statusHandler("rejected", application._id)
                          }
                        >
                          <p>Rejected</p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="applicants_tablehead">
          <h1>A list of your recent applied users</h1>
        </div>
      </div>
    </div>
  );
}

export default Applicants;
