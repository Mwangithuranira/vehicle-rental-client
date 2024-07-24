// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// // Define the UserState type
// export interface UserState {
//   fullName: string;
//   address: string;
//   phoneNumber: string;
//   email: string;
//   password: string;
//   image: File | null;
//   role: string;
//   status: 'idle' | 'loading' | 'failed';
//   error: string | null;
// }

// // Initial state for the user slice
// const initialState: UserState = {
//   fullName: '',
//   address: '',
//   phoneNumber: '',
//   email: '',
//   password: '',
//   image: null,
//   role: 'user',
//   status: 'idle',
//   error: null,
// };

// // Asynchronous thunk for registering a user
// export const registerUser = createAsyncThunk<
//   UserState,
//   Omit<UserState, 'status' | 'error'>,
//   { rejectValue: string }
// >('/register', async (userData, { rejectWithValue }) => {
//   try {
//     // Prepare form data if there's a file to upload
//     const formData = new FormData();
//     formData.append('fullName', userData.fullName);
//     formData.append('address', userData.address);
//     formData.append('phoneNumber', userData.phoneNumber);
//     formData.append('email', userData.email);
//     formData.append('password', userData.password);
//     formData.append('role', userData.role);

//     if (userData.image) {
//       formData.append('image', userData.image);
//     }

//     // Make the API call to register the user
//     const response = await fetch('http://localhost:8000/auth/register', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.status === 403) {
//       throw new Error('Forbidden: You do not have permission to access this resource');
//     }

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Registration failed');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return rejectWithValue((error as Error).message);
//   }
// });

// // Create the user slice
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserState>) => {
//         state.status = 'idle';
//         state.error = null;
//         state.fullName = action.payload.fullName;
//         state.address = action.payload.address;
//         state.phoneNumber = action.payload.phoneNumber;
//         state.email = action.payload.email;
//         state.password = action.payload.password;
//         state.image = action.payload.image;
//         state.role = action.payload.role;
//       })
//       .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.status = 'failed';
//         state.error = action.payload ?? 'Unknown error';
//       });
//   },
// });

// // Export the user reducer
// export default userSlice.reducer;
