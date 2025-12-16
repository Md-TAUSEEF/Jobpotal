import "./App.css";
import Navbar from "./Components/shared/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/auth/login";
import Home from "./Components/pages/Home";
import Signup from "./Components/auth/Signup";
import Jobs from "./Components/pages/Jobs";
import Browser from "./Components/pages/Browser";
import Profile from "./Components/shared/Profile";
import JobDetailed from "./Components/pages/JobDetailes";
import Company from "./Components/Admin/Company";
import Companycreate from "./Components/Admin/Companycreate"
import CompanySetup from "./Components/Admin/companySetup"
import AdminJobs from "./Components/Admin/AdminJobs";
import AdminPostJob from "./Components/Admin/AdminPostJob";
import Applicants from "./Components/Admin/Applicants";
import ProtectedRoute from "./Components/Admin/ProctedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/job" element={<Jobs/>}/>
          <Route path="/browser" element={<Browser/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/description/:id" element={<JobDetailed />} />


         <Route path="/admin/compaines" element={<ProtectedRoute><Company/></ProtectedRoute>}/>
         <Route path="/admin/compaines/createcompany" element={<ProtectedRoute><Companycreate/></ProtectedRoute>}/>
         <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
         <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/> 
          <Route path="/admin/jobs/create" element={<ProtectedRoute><AdminPostJob/></ProtectedRoute>}/> 
        <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />





        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
