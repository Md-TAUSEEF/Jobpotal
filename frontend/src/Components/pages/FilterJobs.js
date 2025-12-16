import "./FilterJobs.css";
import { useDispatch } from "react-redux";
import { setSearchquery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

function FilterJobs() {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const filterData = [
    {
      filterType: "Location",
      array: ["Mumbai", "Delhi", "Bihar", "Punjab"]
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "MERN Stack Developer", "React.js", "Backend Developer"]
    },
    {
      filterType: "Salary",
      array: ["0-40k", "40k-1 Lakh", "1 Lakh to 5 Lakh"]
    }
  ];

  // 🔥 FILTER HANDLER
  const handleFilterChange = (value) => {
    dispatch(setSearchquery(value));
      navigate("/browser");
  };

  return (
    <div className="filter_cnt">
      <h1>Filter Jobs</h1>
      <hr />

      {filterData.map((data, index) => (
        <div className="filter_data" key={index}>
          <h3>{data.filterType}</h3>

          {data.array.map((value, idx) => (
            <label className="filter_value" key={idx}>
              <input
                type="radio"
                name={data.filterType}
                value={value}
                onChange={() => handleFilterChange(value)}
              />
              {value}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FilterJobs;
