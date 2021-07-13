import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestMessages } from '../../api/Firebase';
import { RootState } from '../../app/store';
import { addChatObject } from '../../features/chatReducers';
import { Message } from '../../features/Message';
import { ChatData } from '../../types/interfaces';



//TODO redundancy for chat component, fix this later
const ChatFView: React.FC<ChatData> = ({ _id, _name }) => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state: RootState) => state.chats)

  const requestMessages = async () => {
    if (_id !== null) {
      const messages = await getLatestMessages(_id, new Date(), 'friend');


    }
  }

  useEffect(() => {
    dispatch(addChatObject({ chats, _id }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id])

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
        <Message content={'loremipsdusadsakmnvaskjdnvcadkljbajdnadjlbalasd sadasfnsal jslbflsjba sdasf salfsjasljfn '} side='left'></Message><Message content={'test text lorem ipsum'} side='right'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='right'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='left'></Message>
        <Message content={'loremipsdusadsakmnvaskjdnvcadkljbajdnadjlbalasd sadasfnsal jslbflsjba sdasf salfsjasljfn '} side='left'></Message><Message content={'test text lorem ipsum'} side='right'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='right'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum2'} side='left'></Message>
        <Message content={'loremipsdusadsakmnvaskjdnvcadkljbajdnadjlbalasd sadasfnsal jslbflsjba sdasf salfsjasljfn '} side='left'></Message><Message content={'test text lorem ipsum'} side='right'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='right'></Message><Message content={'test text lorem ipsum'} side='left'></Message><Message content={'test text lorem ipsum'} side='left'></Message>
      </div>

      <div className='sendInputFlexbox'>
        {/* Validate input text */}
        <Input placeholder={'Enter your message'} />
        <Button type="primary" icon={<SendOutlined />} />
      </div>

    </>
  )
}

export default ChatFView