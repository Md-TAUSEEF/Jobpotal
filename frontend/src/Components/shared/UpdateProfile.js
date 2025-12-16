import { MdClose } from "react-icons/md";
import { useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateProfile({ open, setOpen }) {
  const { user } = useSelector((state) => state.auth);
  const {loading} =useSelector((store)=>store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || ""
  });

  if (!open) return null;

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
   setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        "https://jobpotal-673b.onrender.com/api/v1/user/profile/update",
        formData,
        {
          headers: {
             "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="update_overlay">
      <div className="update_modal">
        <div className="update_header">
          <h2>Update Profile</h2>
          <MdClose className="close_icon" onClick={() => setOpen(false)} />
        </div>

        <form className="update_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={input.fullname}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={input.phoneNumber}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Profile Bio"
            value={input.bio}
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={input.skills}
            onChange={handleChange}
          />

      <label>Upload File (PDF / Image / Video)</label>
<input
  type="file"
  accept="application/pdf,image/*,video/*"
  onChange={fileChangeHandler}
/>


          {loading ? (
            <button type="submit">Loading......</button>
          ):(
            <button type="submit">Save Changes</button>
          )}

         
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
