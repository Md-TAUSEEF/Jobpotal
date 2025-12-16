import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setsingleJob } from "../redux/jobSlice";

const useSetSingleJob = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      if (!jobId) return;



      try {
        const res = await axios.get(
          `https://jobpotal-673b.onrender.com/api/v1/job/get/${jobId}`,
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
