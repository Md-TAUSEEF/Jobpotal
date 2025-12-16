import { MdEdit, MdOutlineEmail } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import AppliedJob from "./AppliedJob";
import UpdateProfile from "./UpdateProfile";
import "./Profile.css";
import { useState } from "react";
import { useSelector } from "react-redux";



  const isResume = true;
function Profile() {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);


  return (
    <div className="profile_cnt">
      <div className="profile_mid">
        <div className="profile_midleft">
          <div className="profile_img">
            <img
              src={user?.profile?.profilePhoto}
              alt="User profile"
            />
          </div>

          <div className="profile_imgright">
            <h2>{user?.fullname}</h2>
            <p>{user?.profile?.bio || "No bio added"}</p>
          </div>
        </div>

        <div className="profilemidright">
          <MdEdit onClick={() => setOpen(true)} />
        </div>
      </div>

      <div className="email_icon">
        <MdOutlineEmail />
        <p>{user?.email}</p>
      </div>

      <div className="contact_icon">
        <RiContactsBook3Line />
        <p>{user?.phoneNumber}</p>
        <p>{user?.role}</p>
      </div>

      <div className="skill_cnt">
        {user?.profile?.skills?.length > 0 ? (
          user.profile.skills.map((skill, index) => (
            <div className="skills_btn" key={index}>
              <button className="skil_btns">{skill}</button>
            </div>
          ))
        ) : (
          <span>You have not added skills</span>
        )}
      </div>

   <div className="profile_resume">
  <label>Resume</label>

  {isResume ? (
    <a
      href={user?.profile?.resume}
      target="_blank"
      rel="noopener noreferrer"
    >
      {user?.profile?.resumeOriginalName || "Download Resume"}
    </a>
  ) : (
    <span>NA</span>
  )}
</div>


      <div className="allaplied_job">
        <AppliedJob />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
