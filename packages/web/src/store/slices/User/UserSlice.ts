import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  user: UserModel.ShallowJSON | null;
};

const initialState: UserState = {
  user: null,
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
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
