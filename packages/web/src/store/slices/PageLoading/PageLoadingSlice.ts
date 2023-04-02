import { createSlice } from "@reduxjs/toolkit";

export interface PageLoadingState {
  loading: boolean;
}

const initialState: PageLoadingState = {
  loading: true,
};

/**
 * Contains the loading status of the site and/or page
 */
const pageLoadingSlice = createSlice({
  name: "pageLoading",
  initialState,
  reducers: {
    showLoadingSpinner: (state) => {
      state.loading = true;
    },
    hideLoadingSpinner: (state) => {
      state.loading = false;
    },
  },
});

export const { hideLoadingSpinner, showLoadingSpinner } =
  pageLoadingSlice.actions;
export default pageLoadingSlice.reducer;
