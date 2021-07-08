import React from 'react';
import { ChatData } from '../../types/interfaces';

//TODO redundancy for chat component, fix this later
const ChatFView: React.FC<ChatData> = ({ _id, _name }) => {

  return (
    <>
      Chat ID : {_id} <br />
      Username: {_name}
    </>
  )
}

export default ChatFView