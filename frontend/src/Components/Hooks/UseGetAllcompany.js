import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";

const useGetAllcompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
     

      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/company/get",
          { withCredentials: true }
        );

        console.log("API RESPONSE 👉", res.data);

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies)); 
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCompany();
  }, [dispatch]);
};

export default useGetAllcompany;
