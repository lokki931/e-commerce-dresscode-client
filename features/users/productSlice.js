import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { getCookiesHeader } from '@/app/actions';
const apiProductsUrl = `${process.env.apiUrl}/products`;

// Input selector that returns the product list directly
const selectAllProducts = (state) => state.products?.all ?? [];

// Memoized selector to return sorted products
export const getAllProductsMemoized = createSelector([selectAllProducts], (products) => {
  // Create a new array for sorting to avoid mutating the original state
  return products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});
export const allProducts = createAsyncThunk('product/allProducts', async () => {
  const response = await fetch(`${apiProductsUrl}/`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
});
export const getByIdProducts = createAsyncThunk('product/getByIdProducts', async (id) => {
  const response = await fetch(`${apiProductsUrl}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
});

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (values, { rejectWithValue }) => {
    try {
      // Retrieve the token
      const token = await getCookiesHeader();
      if (!token) {
        return rejectWithValue('Authorization token is missing');
      }

      // Perform the POST request
      const response = await fetch(`${apiProductsUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: values, // Since this is FormData, do not set Content-Type headers manually
      });

      // Parse response
      const data = await response.json();

      // Handle non-OK responses
      if (!response.ok) {
        return rejectWithValue(data.message || 'Product creation failed');
      }

      // Return data if successful
      return data;
    } catch (error) {
      // Catch any other errors (like network issues)
      return rejectWithValue('An unexpected error occurred');
    }
  },
);
export const updateProducts = createAsyncThunk(
  'product/updateProducts',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = await getCookiesHeader();
      if (!token) {
        return rejectWithValue('Authentication token not found');
      }

      const response = await fetch(`${apiProductsUrl}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data, // data is assumed to be a FormData object
      });

      const responseData = await response.json();

      if (!response.ok) {
        return rejectWithValue(responseData.message || 'Update failed');
      }

      return responseData; // Assuming the updated product data is returned here
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const token = await getCookiesHeader();
      if (!token) {
        return;
      }
      const response = await fetch(`${apiProductsUrl}/${id}`, {
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
  product: null,
  create: null,
  update: null,
  delete: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductId(state) {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(getByIdProducts.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.create = action.payload;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.update = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.delete = action.payload;
      });
  },
});

export const { resetProductId } = productSlice.actions;

export default productSlice.reducer;
