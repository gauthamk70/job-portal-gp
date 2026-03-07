import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:3000/users"


// REGISTER USER
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
     console.log("Sending to server:", userData)
    const result = await axios.post(BASE_URL, userData)

    console.log("Response:", result.data)
    return result.data
  }
)


// LOGIN USER
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    const result = await axios.get(
      `${BASE_URL}?email=${email}&password=${password}`
    )
    return result.data[0]
  }
)


// UPDATE PROFILE
export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async ({ id, updatedData }) => {
    const result = await axios.patch(
      `${BASE_URL}/${id}`,
      updatedData
    )
    return result.data
  }
)


const userSlice = createSlice({
  name: "users",

  initialState: {
    currentUser: null,
    loading: false,
    error: null
  },

  reducers: {
    logoutUser: (state) => {
      state.currentUser = null
    }
  },

  extraReducers: (builder) => {

    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })

      .addCase(registerUser.rejected, (state) => {
        state.loading = false
      })


      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })

      .addCase(loginUser.rejected, (state) => {
        state.loading = false
      })


      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })

  }
})

export const { logoutUser } = userSlice.actions


export default userSlice.reducer