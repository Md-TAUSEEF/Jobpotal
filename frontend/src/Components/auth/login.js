import { Fragment, useState } from "react";
import "../auth/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";

function Login() {
  const [users, setUsers] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const SubmitEvent = async (e) => {
    e.preventDefault();


    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        "https://jobpotal-673b.onrender.com/api/v1/user/login",
        {
          fullname: users.fullname,
          email: users.email,
          password: users.password,
          role: users.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

 


      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <div className="login_cnt">
        <div className="login_mid">
          <h1>Login</h1>

          <form onSubmit={SubmitEvent}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={users.fullname}
              placeholder="Please enter your full name"
              onChange={changeEventHandler}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={users.email}
              placeholder="Please enter your email"
              onChange={changeEventHandler}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={users.password}
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
                    checked={users.role === "student"}
                    onChange={changeEventHandler}
                  />
                  <label>Student</label>
                </div>

                <div className="login_form1">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={users.role === "recruiter"}
                    onChange={changeEventHandler}
                  />
                  <label>Recruiter</label>
                </div>
              </div>
            </div>

                
            {loading ? (
              <button className="login_btn" disabled>
                Loading...
              </button>
            ) : (
              <button type="submit" className="login_btn">
                Login
              </button>
            )}
          </form>

          <p>
            Don't have an account?
            <Link to="/signup">
              <span>Signup</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
