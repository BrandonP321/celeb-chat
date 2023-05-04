import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  user: UserModel.ShallowJSON | null;
  isFetching: boolean;
};

const initialState: UserState = {
  user: null,
  isFetching: true,
};

/** Returns basic user data to be displayed across site */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /** Updates user data in store */
    setUser: (state, action: PayloadAction<UserModel.ShallowJSON>) => {
      state.user = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
      state.isFetching = action.payload.isFetching;
    },
  },
});

export const { setUser, setIsFetching } = userSlice.actions;
export default userSlice.reducer;
