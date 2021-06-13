/* eslint-disable no-unreachable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitState {
  logged: {
    id: string;
    status: boolean
    username: string
  };
  alerts: Array<{
    element: {
      title: string;
      message: string;
    },
    id: number
  }>
}

const initialState: InitState = {
  logged: {
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
      console.log(action, state);
      // switch (action.type) {
      //   case "log_in":
      //     return {
      //       ...state,
      //       logged: {
      //         id: action.payload.id,
      //         status: true,
      //         username: action.payload.username
      //       }
      //     }
      //   case "add_alert":
      //     console.log(state)
      //     return {
      //       ...state,
      //       alerts: [{
      //         visibility: true,
      //         element: {
      //           title: 'string',
      //           message: 'string',
      //         }
      //       }]
      //     }
      //     break;
      //}

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


