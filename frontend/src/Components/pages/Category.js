import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Category.css";
import { setSearchquery } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Category() {
  const categoryList = [
    "Frontend Developer",
    "Backend Developer",
    "React.js Developer",
    "MERN Stack Developer",
    "Data Science",
    "Data Analyst",
    "Web Developer",
    "Graphic Designer",
  ];

    const dispatch=useDispatch()
  const navigate=useNavigate();


const searchjobHandlear=(query)=>{
  dispatch( setSearchquery(query))
  navigate("/browser")


}

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3

  const handleNext = () => {
    if (startIndex + visibleCount < categoryList.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="category_wrapper">
      <button className="arrow" onClick={handlePrev}>
        <FaChevronLeft />
      </button>

      <div className="category_container">
        {categoryList
          .slice(startIndex, startIndex + visibleCount)
          .map((cat, index) => (
            <button key={index} className="category_btn" onClick={()=>searchjobHandlear(cat)}>
              {cat}
            </button>
          ))}
      </div>

      <button className="arrow" onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Category;
