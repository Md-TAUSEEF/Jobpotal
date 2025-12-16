import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setsingleJob } from "../redux/jobSlice";

const useSetSingleJob = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      if (!jobId) return;

      console.log("API CALLING 👉 http://localhost:8000/api/v1/job/get/" + jobId);

      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/job/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setsingleJob(res.data.job));
        }
      } catch (error) {
        console.log("Error fetching job:", error);
      }
    };

    fetchSingleJob();
  }, [dispatch, jobId]);  

  return null; 
};

export default useSetSingleJob;
