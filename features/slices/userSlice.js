import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookiesHeader, setCookiesHeader } from '@/app/actions';
const apiUsersUrl = `${process.env.apiUrl}/users`;

export const userMe = createAsyncThunk('user/userMe', async () => {
  const token = await getCookiesHeader();
  if (!token) {
    return;
  }
  const response = await fetch(`${apiUsersUrl}/me`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data = await response.json();
  return data;
});

export const userLogin = createAsyncThunk('user/userLogin', async (values, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUsersUrl}/signin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(values),
    });

    const data = await response.json();

    // Check if the response is not OK
    if (!response.ok) {
      return rejectWithValue(data.message || 'Login failed'); // Provide a descriptive error
    }

    // Handle successful login: set the token in cookies
    setCookiesHeader(data.token);
    return { token: data.token, user: data.user }; // Optionally return user info along with token
  } catch (error) {
    // Handle any other errors (network issues, etc.)
    return rejectWithValue('An unexpected error occurred');
  }
});

export const userRegister = createAsyncThunk(
  'user/userRegister',
  async (values, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUsersUrl}/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      // Check if the response is not OK (status not in the 2xx range)
      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed'); // Return error message
      }

      // On successful registration, return the user data or any token provided by the server
      return data;
    } catch (error) {
      // Handle network or unexpected errors
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  },
);

const initialState = {
  me: null,
  loginStatus: null,
  registerUser: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset(state) {
      state.me = null;
      state.loginStatus = false;
      state.registerUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userMe.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginStatus = action.payload;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.registerUser = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
