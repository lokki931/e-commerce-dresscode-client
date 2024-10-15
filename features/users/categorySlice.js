import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookiesHeader } from '@/app/actions';
const apiCategoriesUrl = `${process.env.apiUrl}/categories`;

export const allCats = createAsyncThunk('category/allCats', async () => {
  const response = await fetch(`${apiCategoriesUrl}/`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
});
export const getByIdCats = createAsyncThunk('category/getByIdCats', async (id) => {
  const response = await fetch(`${apiCategoriesUrl}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
});

export const createCats = createAsyncThunk(
  'category/createCats',
  async (values, { rejectWithValue }) => {
    try {
      const token = await getCookiesHeader();
      if (!token) {
        return;
      }
      const response = await fetch(`${apiCategoriesUrl}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify(values),
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
export const updateCats = createAsyncThunk(
  'category/updateCats',
  async (values, { rejectWithValue }) => {
    try {
      const token = await getCookiesHeader();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch(`${apiCategoriesUrl}/${values.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Add Content-Type header
        },
        method: 'PUT',
        body: JSON.stringify(values), // Send the entire values object
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Update failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const deleteCats = createAsyncThunk(
  'category/deleteCats',
  async (id, { rejectWithValue }) => {
    try {
      const token = await getCookiesHeader();
      if (!token) {
        return;
      }
      const response = await fetch(`${apiCategoriesUrl}/${id}`, {
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
  create: null,
  delete: null,
  category: null,
  update: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCatId(state) {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allCats.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(getByIdCats.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(createCats.fulfilled, (state, action) => {
        state.create = action.payload;
      })
      .addCase(updateCats.fulfilled, (state, action) => {
        state.update = action.payload;
      })
      .addCase(deleteCats.fulfilled, (state, action) => {
        state.delete = action.payload;
      });
  },
});

export const { resetCatId } = categorySlice.actions;

export default categorySlice.reducer;
