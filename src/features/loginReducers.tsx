/* eslint-disable no-unreachable */
import { createSlice } from '@reduxjs/toolkit';

interface InitState {
  logged: {
    id: string;
    token: string;
    status: boolean;
    username: string;
  };
  friends: Array<{
    name: string;
    uid: string;
  }>
  teams: Array<{
    name: string;
    tid: string;
  }>
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
  friends: [],
  teams: [],
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
    userLoadData: (state, action) => {
      state.logged = action.payload;
    },
    addAlert: (state, action) => {
      state.alerts.push(action.payload)
    },
    disableAlert: (state, action) => {
      state.alerts = state.alerts.filter(el => el.id !== action.payload)
    },
    loadFriends: (state, action) => {
      state.friends = action.payload;
    },
    loadTeams: (state, action) => {
      state.teams = action.payload;
    }
  }

})


export const { userLogin, addAlert, disableAlert, loadFriends, loadTeams, userLoadData } = loginSlice.actions;

export default loginSlice.reducer;


