import {createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem("user")) || {};
export const initialState = {
  current: initialUser,
  settings: {

  }
}

// export const socialLogin = createAsyncThunk("users/socialLogin", async (payload) => {
//   const responseData = await 
// })

// export const login = createAsyncThunk("users/login", async (payload) => {
//   const responseData = await userApi.login(payload);

//   localStorage.setItem(StorageKeys.TOKEN, responseData.data.jwt);
//   localStorage.setItem(StorageKeys.USER, JSON.stringify(responseData.data.user));

//   return responseData.data;
// });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
        state.current = {},
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    },
  },
})

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions

export default userSlice.reducer