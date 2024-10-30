import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookiesHeader } from '@/app/actions';
const apiOrdersUrl = `${process.env.apiUrl}/orders`;

export const allOrders = createAsyncThunk('order/allOrders', async () => {
  const token = await getCookiesHeader();
  if (!token) {
    return;
  }
  const response = await fetch(`${apiOrdersUrl}/`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});
export const allUsersOrders = createAsyncThunk('order/allUsersOrders', async (userId) => {
  const token = await getCookiesHeader();
  if (!token) {
    return;
  }
  const response = await fetch(`${apiOrdersUrl}/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const getByIdOrder = createAsyncThunk('order/getByIdOrder', async (id) => {
  const token = await getCookiesHeader();
  if (!token) {
    return;
  }
  const response = await fetch(`${apiCategoriesUrl}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderDetails, { rejectWithValue }) => {
    try {
      const token = await getCookiesHeader();
      if (!token) {
        return;
      }
      const response = await fetch(`${apiOrdersUrl}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      // Check if the response is not OK
      if (!response.ok) {
        return rejectWithValue(data.message || 'Created failed'); // Provide a descriptive error
      }

      return data; // Optionally return user info along with token
    } catch (error) {
      // Handle any other errors (network issues, etc.)
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      const token = await getCookiesHeader();
      if (!token) {
        return;
      }
      const response = await fetch(`${apiOrdersUrl}/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
        method: 'DELETE',
      });

      // Check if the response is not OK
      if (!response.ok) {
        return rejectWithValue(data.message || 'Delete failed'); // Provide a descriptive error
      }
    } catch (error) {
      // Handle any other errors (network issues, etc.)
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

const initialState = {
  all: null,
  usersOrders: null,
  order: null,
  create: null,
  delete: null,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(getByIdOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(allUsersOrders.fulfilled, (state, action) => {
        state.usersOrders = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.create = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.delete = action.payload;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
