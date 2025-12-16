import { useState } from "react";
import "../shared/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.get(
        "https://jobpotal-673b.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );
      dispatch(setUser(null));
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="navbar_cnt">
     
      <div className="nav_right">
        <h1>
          Job<span>Portal</span>
        </h1>
      </div>

      <div className="nav_left">

        <div className="menu_icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

      
        <ul className={menuOpen ? "nav_menu active" : "nav_menu"}>
          {user && user.role === "recruiter" ? (
            <>
              <li><Link to="/admin/compaines">Company</Link></li>
              <li><Link to="/admin/jobs">Jobs</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/job">Jobs</Link></li>
              <li><Link to="/browser">Browse</Link></li>
            </>
          )}
        </ul>

        
        {user ? (
          <div className="nav_avatar">
            <img
              src={user?.profile?.profilePhoto}
              alt="profile"
              className="avatar_img"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="popover_box">
                <div className="pop_row1">
                  <img
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                    className="pop_img"
                  />
                  <div>
                    <h1>{user.fullname}</h1>
                    <p>{user.role}</p>
                  </div>
                </div>

                <Link to="/profile">
                  <button>View Profile</button>
                </Link>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login"><button className="btn">Login</button></Link>
            <Link to="/signup"><button className="btn">Signup</button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
