import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  id: string | null;
  username: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
}

/** Returns basic user data to be displayed across site */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      /** Updates user data in store */
      setUser: (state, action: PayloadAction<UserState>) => {
			  state.id = action.payload.id;
        state.username = action.payload.username
		  }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;