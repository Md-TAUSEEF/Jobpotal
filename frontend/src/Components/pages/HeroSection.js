import { CiSearch } from "react-icons/ci";
import "./HomeSection.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchquery } from "../redux/jobSlice";
function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchjobHandlear = (e) => {
    e.preventDefault(); // 🔥 stop page reload
    dispatch(setSearchquery(query));
    navigate("/browser");
  };

  return (
    <div className="hero_cnt">

     <div className="hero_cnt1">
        <span>No. 1 Job Hunt Website</span>
      </div>

      <div className="hero_cntmid">
        <h1>
          Search, Apply & <br />
          Get Your <span>Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aliquid aspernatur temporibus nihil tempora dolor!
        </p>
      </div>



      <div className="hero_input">
        <form onSubmit={searchjobHandlear}>
          <input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <CiSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection
