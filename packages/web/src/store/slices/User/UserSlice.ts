import { UpdateUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { SubscriptionTier } from "@celeb-chat/shared/src/utils/ChatUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  user: UserModel.ShallowJSON | null;
  subscriptionTier: SubscriptionTier;
  isFetching: boolean;
};

const initialState: UserState = {
  user: null,
  isFetching: true,
  subscriptionTier: "free",
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
    signout: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<UpdateUserRequest.ReqBody>) => {
      if (state.user) {
        state.user.email = action.payload.email ?? state.user.email;
        state.user.username = action.payload.username ?? state.user.username;
      }
    },
  },
});

export const { setUser, setIsFetching, signout, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
