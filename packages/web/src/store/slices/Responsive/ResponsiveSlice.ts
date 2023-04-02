import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResponsiveState {
    max: boolean;
    large: boolean;
    medium: boolean;
    mobile: boolean;
    tiny: boolean;
	pico: boolean;
}

const initialState: ResponsiveState = {
    max: false,
    large: false,
    medium: false,
    mobile: false,
    tiny: false,
	pico: false
}

/* data passed into reducers when media query event fires */
type ResponsiveBreakpointUpdate = {
	breakpoint: keyof ResponsiveState;
	matches: boolean;
}

/**
 * Returns object of key/value (breakpoint/status) for each CSS breakpoint, allowing for responsive logic within JS
 */
const responsiveSlice = createSlice({
    name: "responsive",
    initialState,
    reducers: {
		/* fired whenever a media query breakpoint event fires */
        breakpointHit: (state, action: PayloadAction<ResponsiveBreakpointUpdate>) => {
			state[action.payload.breakpoint] = action.payload.matches;
		}
    }
});

export const { breakpointHit } = responsiveSlice.actions;
export default responsiveSlice.reducer;