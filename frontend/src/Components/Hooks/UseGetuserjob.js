import { useEffect, useState } from "react";
import axios from "axios";

const UseAppliedjobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/application/get",
          { withCredentials: true }
        );

        if (res.data.success) {
          setAppliedJobs(res.data.application); // ✅ FIXED
        }
      } catch (error) {
        console.log("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return { appliedJobs, loading };
};

export default UseAppliedjobs;
