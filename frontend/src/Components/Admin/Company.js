import React, { useState } from "react";
import "./Company.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllcompany from "../Hooks/UseGetAllcompany";
import { FiMoreVertical, FiEdit } from "react-icons/fi";

function Company() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();
  useGetAllcompany();

  const { companies } = useSelector((store) => store.company);

  const filteredCompanies = companies
    ?.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      return sort === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <>
      <div className="company_cnt">
        <div className="company_mid">
          <div className="filter_section">
            <input
              type="text"
              placeholder="Search company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <button
              type="button"
              onClick={() => navigate("/admin/compaines/createcompany")}
            >
              New Company
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table_wrapper">
        <table className="company_table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCompanies?.length > 0 ? (
              filteredCompanies.map((company) => (
                <tr key={company._id}>
                  <td>
                    <img
                      src={company.logo || "/default-logo.png"}
                      alt="logo"
                      className="company_logo"
                    />
                  </td>

                  <td>{company.name}</td>

                  <td>
                    {new Date(company.createdAt).toLocaleDateString()}
                  </td>

                  <td className="action_cell">
                    {/* 3 DOTS */}
                    <FiMoreVertical
                      className="three_dots"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === company._id ? null : company._id
                        )
                      }
                    />

                    {/* DROPDOWN */}
                    {openMenuId === company._id && (
                      <div className="action_menu">
                        <div
                          className="action_item"
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                        >
                          <FiEdit /> Edit
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no_data">
                  No Company Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Company;
