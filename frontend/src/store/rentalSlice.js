// // src/store/rentalSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const BASE_URL = import.meta.env.MODE === "development"
//   ? "http://localhost:5001"
//   : "https://farmease-backend-8sjs.onrender.com";

// // GET /api/rentals — saari rental listings fetch karta hai
// export const fetchRentals = createAsyncThunk(
//   'rentals/fetchRentals',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/rentals`);
//       if (!res.ok) throw new Error('Failed to fetch rentals');
//       const data = await res.json();
//       return data.rentals || data; // dono response shapes handle karta hai
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // POST /api/rentals — nayi listing create karta hai (multipart form data)
// export const addRental = createAsyncThunk(
//   'rentals/addRental',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/rentals`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to list equipment');
//       }
//       const data = await res.json();
//       return data.rental;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const rentalSlice = createSlice({
//   name: 'rentals',
//   initialState: {
//     items: [],
//     status: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
//     addStatus: 'idle',   // add-listing ke liye alag status (spinner isi se chalega)
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // fetchRentals lifecycle
//       .addCase(fetchRentals.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchRentals.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchRentals.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       // addRental lifecycle
//       .addCase(addRental.pending, (state) => {
//         state.addStatus = 'loading';
//         state.error = null;
//       })
//       .addCase(addRental.fulfilled, (state, action) => {
//         state.addStatus = 'succeeded';
//         state.items.push(action.payload); // naya listing turant list mein daal do, refetch ki zaroorat nahi
//       })
//       .addCase(addRental.rejected, (state, action) => {
//         state.addStatus = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default rentalSlice.reducer;
// src/store/rentalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5001"
  : "https://farmease-backend-8sjs.onrender.com";

// GET /api/rentals — saari rental listings fetch karta hai
export const fetchRentals = createAsyncThunk(
  'rentals/fetchRentals',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/rentals`);
      if (!res.ok) throw new Error('Failed to fetch rentals');
      const data = await res.json();
      return data.rentals || data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST /api/rentals — nayi listing create karta hai (multipart form data)
export const addRental = createAsyncThunk(
  'rentals/addRental',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/rentals`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to list equipment');
      }
      const data = await res.json();
      return data.rental;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET /api/rentals/search?q=... — semantic search
export const searchRentals = createAsyncThunk(
  'rentals/searchRentals',
  async (query, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/rentals/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Search failed');
      }
      const data = await res.json();
      return data.rentals;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const rentalSlice = createSlice({
  name: 'rentals',
  initialState: {
    items: [],
    status: 'idle',
    addStatus: 'idle',
    searchResults: [],
    searchStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRentals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addRental.pending, (state) => {
        state.addStatus = 'loading';
        state.error = null;
      })
      .addCase(addRental.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addRental.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(searchRentals.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchRentals.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchRentals.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default rentalSlice.reducer;