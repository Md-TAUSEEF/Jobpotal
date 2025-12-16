import Category from "./Category";
import HeroSection from "./HeroSection";
import JobCards from "./JobCards";
import useGetAllJob from "../Hooks/UseGetAllJob";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  useGetAllJob();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <>
      <HeroSection />
      <Category />
      <JobCards />
    </>
  );
}

export default Home;
