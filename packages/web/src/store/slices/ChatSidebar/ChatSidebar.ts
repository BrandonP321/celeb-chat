import { createSlice } from "@reduxjs/toolkit";

export interface ChatSidebarState {
  show: boolean;
}

const initialState: ChatSidebarState = {
  show: false,
};

const chatSidebarSlice = createSlice({
  name: "chatSidebar",
  initialState,
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
    toggle: (state) => {
      state.show = !state.show;
    },
  },
});

export const { hide, show, toggle } = chatSidebarSlice.actions;
export default chatSidebarSlice.reducer;
