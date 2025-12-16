import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAdminJobs } from "../redux/jobSlice";

const UseAdminAllJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        console.log("Fetching admin jobs..."); // ✅ debug
        const res = await axios.get(
          "https://jobpotal-673b.onrender.com/api/v1/job/getadminjob",
          { withCredentials: true }
        );

          console.log("API RESPONSE 👉", res.data);
        console.log("Dispatching jobs 👉", res.data.job);

          dispatch(setAdminJobs(res.data.job));
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch admin jobs"
        );
        console.log("Error while fetching admin jobs", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default UseAdminAllJob;
