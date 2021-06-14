/* eslint-disable no-unreachable */
import { createSlice } from '@reduxjs/toolkit';

interface InitState {
  logged: {
    id: string;
    token: string;
    status: boolean;
    username: string;
  };
  alerts: Array<{
    element: {
      title: string;
      message: string;
    },
    id: number;
  }>
}

const initialState: InitState = {
  logged: {
    token: '',
    id: '',
    status: false,
    username: ''
  },
  alerts: []
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.logged = action.payload;
      state.logged.status = true;
      localStorage.setItem('TOKEN', action.payload.token);
    },
    addAlert: (state, action) => {
      state.alerts.push(action.payload)
    },
    disableAlert: (state, action) => {
      state.alerts = state.alerts.filter(el => el.id !== action.payload)
    }
  }

})


export const { userLogin, addAlert, disableAlert } = loginSlice.actions;

export default loginSlice.reducer;


