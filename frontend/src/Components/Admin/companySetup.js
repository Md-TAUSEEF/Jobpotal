import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./companyset.css";
import { setLoading } from "../redux/authSlice";
import { useDispatch } from "react-redux";

function CompanySetup() {
  const navigate = useNavigate();
  const { id: companyId } = useParams();
  const [postLoading, setPostLoading] = useState(false);
    const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // ✅ FETCH COMPANY DATA
  useEffect(() => {
    const fetchCompany = async () => {
      
      try {
        const res = await axios.get(
          `https://jobpotal-673b.onrender.com/api/v1/company/get/${companyId}`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          const company = res.data.company;
          setCompanyName({
            name: company.name || "",
            description: company.description || "",
            website: company.website || "",
            location: company.location || "",
            file: null,
          });
        }
      } catch (error) {
        toast.error("Failed to load company data");
      }
    };

    fetchCompany();
  }, [companyId]);

  const textHandler = (e) => {
    const { name, value } = e.target;
    setCompanyName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileHandler = (e) => {
    setCompanyName((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", companyName.name);
    formData.append("description", companyName.description);
    formData.append("website", companyName.website);
    formData.append("location", companyName.location);

    if (companyName.file) {
      formData.append("file", companyName.file);
    }
    setPostLoading(true);

    try {
      const res = await axios.put(
        `https://jobpotal-673b.onrender.com/api/v1/company/update/${companyId}`,
        formData,
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        navigate("/admin/compaines");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
      finally{
          dispatch(setLoading(false))
        }
  };

  return (
    <div className="companysetup_cnt">
      <div className="companysetup_mid">
        <div className="companysetup_header">
          <button className="back_btn" onClick={() => navigate("/admin/compaines")}>
            <FaArrowLeft /> Back
          </button>
          <h2>Company Setup</h2>
        </div>

        <form onSubmit={handleSubmit} className="company_form">
          <div className="form_row">
            <div className="form_group">
              <label>Company Name</label>
              <input
                type="text"
                name="name"
                value={companyName.name}
                onChange={textHandler}
                required
              />
            </div>

            <div className="form_group">
              <label>Tagline</label>
              <input
                type="text"
                name="description"
                value={companyName.description}
                onChange={textHandler}
                required
              />
            </div>
          </div>

          <div className="form_row">
            <div className="form_group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={companyName.website}
                onChange={textHandler}
              />
            </div>

            <div className="form_group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={companyName.location}
                onChange={textHandler}
              />
            </div>
          </div>

          <div className="form_group file_input">
            <label>Company Logo</label>
            <input type="file" accept="image/*" onChange={fileHandler} />
          </div>

  

 <button type="submit" className="update_btn " disabled={postLoading}>
  {postLoading ? "Loading..." : " Update"}
</button>



        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
