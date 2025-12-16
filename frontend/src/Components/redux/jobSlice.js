import { createSlice } from "@reduxjs/toolkit";
const jobSlice=createSlice({
    name:"job",
    initialState:{
        alljobs:[],
        singleJob:null,
        adminjobs:[],
        searchquery:""
   

        
    },reducers:{
     setAllJobs:(state,action)=>{
        state.alljobs=action.payload
      },
      setsingleJob:(state,action)=>{
        state.singleJob=action.payload
      },
      setAdminJobs:(state,action)=>{
        state.adminjobs=action.payload
      },
      setSearchquery:(state,action)=>{
        state.searchquery=action.payload
      }

    }
});

export const {setAllJobs,setsingleJob, setAdminJobs,setPostJob, setSearchquery}=jobSlice.actions;
export default jobSlice.reducer;