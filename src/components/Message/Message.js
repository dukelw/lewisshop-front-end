import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Col, Container, Row, Form, FormControl, InputGroup } from 'react-bootstrap';

import io from 'socket.io-client';
import { findShopByID, getHistoryMessage, getNonRead, markAsRead } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import styles from './Message.module.scss';
import Button from '../Button';
import UserChatList from '../UserChatList';

const cx = classNames.bind(styles);
const socket = io.connect('http://localhost:810');

function Message() {
  const { toID } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentUser);
  const historyMessages = useSelector((state) => state?.message.getHistoryMessage.messages);
  const userID = currentUser?.metadata.user._id;
  const userName = currentUser?.metadata.user.name;
  const userAvatar = currentUser?.metadata.user.thumb;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [shopName, setShopName] = useState('Shop');
  const [shopAvatar, setShopAvatar] = useState('Shop');
  const [currentTyping, setCurrentTyping] = useState('');

  const messageInputRef = useRef(null);
  const messageEndRef = useRef(null);

  const sendMessage = async () => {
    const messageData = {
      roomId: toID + userID,
      senderId: userID,
      receiverId: toID,
      message: newMessage,
    };
    socket.emit('send_message', messageData);
    socket.emit('send_message', { roomId: toID, messages: 'Notifications' });
    const result = await markAsRead(accessToken, toID, userID, dispatch, axiosJWT);
    console.log('User ID: ' + userID, ' toID: ' + toID, ' result: ' + result);
    setNewMessage('');
  };

  useEffect(() => {
    getHistoryMessage(accessToken, toID, userID, dispatch, axiosJWT);
    markAsRead(accessToken, toID, userID, dispatch, axiosJWT);

    const fetchUserName = async () => {
      const shopData = await findShopByID(toID, dispatch, axiosJWT);
      setShopName(shopData?.metadata?.name);
      setShopAvatar(shopData?.metadata?.thumb);
    };

    fetchUserName();

    socket.emit('join_room', toID + userID);

    // To get notifications when anyone chat to shop
    socket.emit('join_room', userID);

    socket.on('receive_message', async (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      await getNonRead(accessToken, userID, dispatch, axiosJWT);
      setCurrentTyping('');
    });

    socket.on('receiving', (data) => {
      const { sender, message } = data;
      if (sender === toID) {
        setCurrentTyping(message);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  // After receiver and send, reload
  useEffect(() => {
    getHistoryMessage(accessToken, toID, userID, dispatch, axiosJWT);
  }, [messages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, historyMessages]);

  return (
    <Container className={cx('container')}>
      <Row>
        <Col className={cx('user')} md={4}>
          <UserChatList />
        </Col>
        <Col className={cx('content')} md={8}>
          <div className={cx('chatbox')}>
            {historyMessages?.map((msg, index) => (
              <div key={index} className={msg.senderId === userID ? cx('right', 'chatzone') : cx('left', 'chatzone')}>
                <img className={cx('avatar')} src={msg.senderId === userID ? userAvatar : shopAvatar} alt="" />
                <div className={cx('content')}>
                  <div className={cx('name')}>{msg.senderId === userID ? 'You' : shopName}</div>
                  <div className={cx('message')}>{msg.message}</div>
                </div>
              </div>
            ))}
            <span>{currentTyping}</span>
            <div ref={messageEndRef} />
          </div>
          <Form
            className={cx('inputzone')}
            onSubmit={(e) => {
              e.preventDefault();
              if (newMessage) {
                sendMessage();
              } else {
                messageInputRef.current.focus();
              }
            }}
          >
            <Col md={8}>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Type your message"
                  value={newMessage}
                  onChange={(e) => {
                    socket.emit('typing', { roomId: toID + userID, name: userName, sender: userID });
                    setNewMessage(e.target.value);
                  }}
                  className={cx('input')}
                  ref={messageInputRef}
                />
                <Button primary type="submit">
                  Send
                </Button>
              </InputGroup>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
