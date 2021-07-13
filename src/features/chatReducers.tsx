import { createSlice } from "@reduxjs/toolkit";

interface Message {
  _name: string;
  content: string;
  deleted: boolean;
  timestamp: string;
  _uid: string;
}

interface Chat {
  _id: string;
  messages: Array<Message>;
  latestTimestamp: string;
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
      const { _id, chats } = action.payload;

      const req = doesIdExistInArray(_id, chats);
      if (!req.exist) // if doesnt exist then create new one 
        state.chats.push({ _id, latestTimestamp: new Date().toJSON(), messages: [] } as Chat);
    },

    addMessageToChat: (state, action) => {
      const { data, chats, chatId } = action.payload;
      let newArray = chats.map((obj: any) => JSON.parse(JSON.stringify(obj))); //deep copy (not best approach)

      const req = doesIdExistInArray(chatId, chats);
      if (req.exist && req.index !== null) {
        newArray[req.index].messages.push(data as Message);
        state.chats = newArray;
      }

    },

    addManyMessagesToChat: (state, action) => {
      const { data, chats, chatId } = action.payload;
      let newArray = chats.map((obj: any) => JSON.parse(JSON.stringify(obj)));


      const req = doesIdExistInArray(chatId, chats);
      if (req.exist && req.index !== null) {
        newArray[req.index].messages.push(...data as Message[]);
        state.chats = newArray;
      }
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(addNewChatObject.fulfilled, (state, action) => {

  //   })
  // }
})


const doesIdExistInArray = (element: string, array: Array<Chat>) => {
  //console.log(array.findIndex((el) => el._id === element))
  let index;
  if ((index = array.findIndex((el) => el._id === element)) >= 0)
    return { exist: true, index };
  return { exist: false, index: null }
}




export const { addMessageToChat, addChatObject, addManyMessagesToChat } = chatSlice.actions;

export default chatSlice.reducer;