import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../apiService";
import { fetchBook } from "./bookAPI";
const initialState = {
  books: [],
  readinglist: [],
  bookDetail: null,
  status: null,
};

export const addToReadingList = createAsyncThunk(
  "book/addToReadingList",
  async (book) => {
    const response = await api.post(`/favorites`, book);
    return response.data;
  }
);
export const getReadingList = createAsyncThunk(
  "book/getReadingList",
  async () => {
    const response = await api.get(`/favorites`);
    return response.data;
  }
);
export const removebook = createAsyncThunk(
  "book/removebook",
  async (removieBookId) => {
    const response = await api.delete(`/favorites/${removieBookId}`);
    return response.data;
  }
);
export const getBookDetail = createAsyncThunk(
  "book/getBookDetail",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);
export const fetchData = createAsyncThunk("book/fetchData", async (props) => {
  const response = await fetchBook(props);
  return response.data;
});

export const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: (builder) => {
    //addToReadingList
    builder
      .addCase(addToReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToReadingList.fulfilled, (state, action) => {
        state.readinglist.push(action.payload);
        toast.success("The book has been added to the reading list!");
        state.status = null;
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        toast.error(action.error.message);
      });
    // getReadingList
    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = null;
        state.readinglist = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
      });
    //removebook removebook
    builder
      .addCase(removebook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removebook.fulfilled, (state, action) => {
        state.status = null;
        toast.success("The book has been removed");
      })
      .addCase(removebook.rejected, (state, action) => {
        state.status = "failed";
      });
    //getBookDetail
    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null;
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
      });
    //fetchData homepage
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = null;
        state.books = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

// export const {} = bookSlice.actions;

export default bookSlice.reducer;
