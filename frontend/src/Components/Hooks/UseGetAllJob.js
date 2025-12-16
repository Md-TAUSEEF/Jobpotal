import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

const useGetAllJob = () => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchAllJobs = async () => {

      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/job/get",
          { withCredentials: true }
        );

        if (res.data.success) {
         dispatch(setAllJobs(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJob;
