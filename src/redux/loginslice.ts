// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from './store';
// import axios from 'axios';

// interface UserState {
//   // Define the type for the user property
//   // based on your application's user data structure
//   email: string;
//    password: string; 
//    role: string;
//    token: string;

// }

// interface LoginState {
//   user: UserState | null;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: LoginState = {
//   user: null,
//   status: 'idle',
//   error: null,
// };

// // Async thunk for logging in
// export const loginUser = createAsyncThunk<UserState, { email: string; password: string }, { rejectValue: string }>(
//   'auth/loginUser',
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post('/api/login', credentials);
//       return response.data; // assuming API returns { token, role, user }
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Login failed. Please check your credentials and try again.');
//     }
//   }
// );

// const loginSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState>) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string;
//       });
//   },
// });

// export default loginSlice.reducer;

// export const selectLoginState = (state: RootState) => state.auth;
