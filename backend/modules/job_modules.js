import mongoose from "mongoose";
const jobSchema=new mongoose.Schema({
    title:{
        type:"string",
        required:true
    },

    description:{
        type:"string",
        required:true
    },


    requirements:[
        {
            type:String
        }
    ],
    Salary:{
        type:Number,
        required:true
    },

    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    exprinceLevel:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },

    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application',
        }
    ]
},{ timestamps: true });
export const Job = mongoose.model("Job", jobSchema);