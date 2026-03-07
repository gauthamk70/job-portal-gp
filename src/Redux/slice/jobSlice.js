import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',async()=>{
    const result = await axios.get('http://localhost:3000/jobs')
    console.log(result.data);
    return result.data
    
})

const jobSlice = createSlice({
    name:'jobs',
    initialState:{
        allJobs:[]
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchJobs.fulfilled,(state,action)=>{
            state.allJobs=action.payload
        }),
        builder.addCase(fetchJobs.pending,(state,action)=>{
            state.allJobs=[]
        }),
        builder.addCase(fetchJobs.rejected,(state,action)=>{
            state.allJobs=[]
        })
    }

})


export default jobSlice.reducer