/* eslint-disable no-unreachable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged: {
    id: '',
    status: false,
    username: ''
  },
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        logged: {
          id: action.payload.id,
          status: true,
          username: action.payload.username
        }
      }
    }
  }

})


export const { login } = loginSlice.actions;

export default loginSlice.reducer;


