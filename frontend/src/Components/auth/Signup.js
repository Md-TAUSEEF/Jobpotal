import { Fragment, useState } from "react";
import "../auth/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

 const {loading}=useSelector((store)=>store.auth);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    
    //for file take
     if (input.file) formData.append("file", input.file);

    try {

      dispatch(setLoading(true));

      const res = await axios.post(
        `https://jobpotal-673b.onrender.com/api/v1/user/register`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
       
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <div className="login_cnt">
        <div className="login_mid">
          <h1>Signup</h1>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              placeholder="Please enter your full name"
              onChange={changeEventHandler}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              placeholder="Please enter your email"
              onChange={changeEventHandler}
            />

            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              placeholder="Please enter your phone number"
              onChange={changeEventHandler}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              placeholder="Please enter your password"
              onChange={changeEventHandler}
            />

            <div className="login_form">
              <div className="login_left">
                <div className="login_form1">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                  />
                  <label>Student</label>
                </div>

                <div className="login_form1">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                  />
                  <label>Recruiter</label>
                </div>
              </div>

              <div className="login_formrght">
                <label>Profile</label>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </div>
            </div>

            {
              loading ? (
                <button className="login_btn" disabled>
                Loading...
              </button>
              ):(
                
            <button type="submit" className="login_btn">
              Signup
            </button>
              )
            }
          </form>

          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Signup;
