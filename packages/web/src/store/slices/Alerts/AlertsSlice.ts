import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AlertType {
  Info = "info",
  Error = "error",
}

export type Alert = {
  type: AlertType;
  msg: string;
  isDismissed?: boolean;
};

export interface AlertsState {
  alerts: Alert[];
}

const initialState: AlertsState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, { payload }: PayloadAction<Alert>) => {
      const newAlerts = state.alerts;
      newAlerts.push(payload);

      state.alerts = newAlerts;
    },
    dismissAlert: (
      state,
      { payload }: PayloadAction<{ alertIndex: number }>
    ) => {
      const newAlerts = state.alerts;
      newAlerts[payload.alertIndex].isDismissed = true;

      state.alerts = newAlerts;
    },
    dismissAllAlerts: (state) => {
      state.alerts = state.alerts.map((a) => ({ ...a, isDismissed: true }));
    },
  },
});

export const { addAlert, dismissAlert, dismissAllAlerts } = alertsSlice.actions;
export default alertsSlice.reducer;
