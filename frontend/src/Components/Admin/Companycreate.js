import React, { useState } from "react";
import "./Companycreate.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
import { toast } from "react-toastify";

function Companycreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const handleCreate = async () => {
    if (!companyName.trim()) {
      alert("Company name is required");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://jobpotal-673b.onrender.com/api/v1/company/register",
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        dispatch(setSingleCompany(data.company));
        toast.success(data.message);
        const companyId = data?.company?._id;

        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="createcmp_cnt">
      <div className="create_mid">
        <div className="create_head">
          <h2>Your Company Name</h2>
          <p>
            What would you like to name your company? This is your company
            description section.
          </p>
        </div>

        <div className="createcmp_mid">
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Company Name</label>
            <input
              type="text"
              placeholder="JobHunter, Microsoft, etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <div className="companycreate_btn">
              <button
                type="button"
                className="create_btn"
                onClick={() => navigate("/admin/compaines")}
              >
                Cancel
              </button>

              <button type="button" className="continue_btn" onClick={handleCreate}>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Companycreate;
