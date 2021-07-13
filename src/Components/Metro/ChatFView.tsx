import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestMessages, sendNewMessageToDb } from '../../api/Firebase';
import { RootState } from '../../app/store';
import { addChatObject, addManyMessagesToChat, addMessageToChat } from '../../features/chatReducers';
import { Message } from '../../features/Message';
import { ChatData, MessageInterface } from '../../types/interfaces';



//TODO redundancy for chat component, fix this later
const ChatFView: React.FC<ChatData> = ({ _id, _name }) => {
  const dispatch = useDispatch();
  const [inputContent, setInputContent] = useState("");
  const { chats } = useSelector((state: RootState) => state.chats);
  const currentChat = useSelector((state: RootState) => state.chats.chats.find((el) => el._id === _id));
  const userState = useSelector((state: RootState) => state.login.logged);

  const requestMessages = async () => {
    if (_id !== null) {
      try {
        const messages = await getLatestMessages(_id, new Date(), 'friend');
        const messageData = messages.map(mess => {
          return {
            _uid: mess.uid,
            content: mess.content,
            deleted: mess.deleted,
            timestamp: new Date(mess.timestamp.seconds * 1000).toJSON(),
            _name: 'test' //TODO query 
          }
        });

        dispatch(addManyMessagesToChat({
          data: messageData,
          chats,
          chatId: _id
        }));

      } catch (err) { console.error(err) }
    }
  }

  const sendNewMessage = async (content: string) => {
    console.log(content.length);
    if (validateMessage(content)) {
      try {
        if (_id !== null) {
          const response = await sendNewMessageToDb(content, _id, userState.id, "friend", userState.username);
          if (response.isSend) {
            dispatch(addMessageToChat({
              data: {
                _uid: userState.id,
                content: response.sentContent,
                deleted: false,
                timestamp: new Date().toJSON(),
                _name: userState.username
              } as MessageInterface,
              chats,
              chatId: _id
            }));

            setInputContent("");
          }

        }

      } catch (e) { console.error(e) };
    }
  }

  useEffect(() => {
    dispatch(addChatObject({ chats, _id }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentChat?.messages && currentChat.messages.length === 0) {
      requestMessages();
    }
    //console.log(currentChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat])



  return (
    <>

      <Divider orientation="left" style={{ color: '#a1a1a1', borderTopColor: '#212121' }}> {_name} </Divider>

      <div className="messagesScroll">
        <Row>
          <Col span={24}>
            {/* TODO should make loading circle when clicked */}
            <Button className="loadMoreButton" onClick={() => { console.log('loadmore') }}>Load more</Button>
          </Col>
        </Row>
        {/* TODO Add key to all messages */}
        {currentChat?.messages.map((mess) =>
          <Message
            content={mess.content}
            side={mess._uid === userState.id ? "right" : "left"}>
          </Message>)}
      </div>

      <div className='sendInputFlexbox'>
        {/* Validate input text */}
        <Input
          placeholder={'Enter your message'}
          onChange={(e) => setInputContent(e.target.value)}
          value={inputContent} />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={() => sendNewMessage(inputContent)} />
      </div>

    </>
  )
}

const validateMessage = (message: string) => {
  if (message.length === 0 || message.length > 250) return false;
  return true
}

export default ChatFView