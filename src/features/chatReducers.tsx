import {  createSlice } from "@reduxjs/toolkit";

interface Message {
  content: string;
  timestamp: Date;
  _uid: string;
}

interface Chat {
  _id: string;
  messages: Array<Message>
};

interface ChatState {
  chats: Array<Chat>
};


const initialState: ChatState = {
  chats: []
}

// export const addNewChatObject = createAsyncThunk(
//   'chats/addNewChatObject',
//   async (_, { getState }) => {
//     const {chats} = getState() as ChatState;
//     console.log('payload', _);
//     return chats;
//   }
// )

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatObject: (state, action) => {
      console.log(action.payload);
      const { _id, chats } = action.payload;

      const req = doesIdExistInArray(_id, chats);
      if (!req.exist) // if doesnt exist then create new one 
        state.chats.push({ _id, messages: [] } as Chat);
    },
    addMessageToChat: (state, action) => {
      state.chats = [];
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(addNewChatObject.fulfilled, (state, action) => {

  //   })
  // }
})


const doesIdExistInArray = (element: string, array: Array<Chat>) => {
  console.log(array.findIndex((el) => el._id === element))
  let index;
  if ((index = array.findIndex((el) => el._id === element)) >= 0)
    return { exist: true, index };
  return { exist: false, index: null }
}


export const { addMessageToChat, addChatObject } = chatSlice.actions;

export default chatSlice.reducer;