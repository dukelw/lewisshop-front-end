import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Col, Container, Row, Form, FormControl, InputGroup } from 'react-bootstrap';

import { findUser, getHistoryMessage, getNonRead, markAsRead } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import styles from './ShopMessage.module.scss';
import ChatList from '../ShopChatList';
import Button from '../Button';

const cx = classNames.bind(styles);
const socket = io.connect('http://localhost:810');

function ShopMessage() {
  const { toID } = useParams();
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const historyMessages = useSelector((state) => state?.message.getHistoryMessage.messages);
  const shopID = currentShop?.metadata.shop._id;
  const shopName = currentShop?.metadata.shop.name;
  const shopAvatar = currentShop?.metadata.shop.thumb;
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const axiosJWT = createAxios(currentShop);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('User');
  const [userAvatar, setUserAvatar] = useState('User');
  const [currentTyping, setCurrentTyping] = useState('');

  const messageInputRef = useRef(null);
  const messageEndRef = useRef(null);

  const sendMessage = async () => {
    const messageData = {
      roomId: shopID + toID,
      senderId: shopID,
      receiverId: toID,
      message: newMessage,
    };
    socket.emit('send_message', messageData);
    socket.emit('send_message', { roomId: toID, message: 'Notification' });
    const result = await markAsRead(accessToken, toID, shopID, dispatch, axiosJWT);
    console.log('Shop ID: ' + shopID, ' toID: ' + toID, ' result: ' + result);
    setNewMessage('');
  };

  useEffect(() => {
    getNonRead(accessToken, shopID, dispatch, axiosJWT);
  }, [historyMessages]);

  useEffect(() => {
    getHistoryMessage(accessToken, shopID, toID, dispatch, axiosJWT);

    const fetchUserName = async () => {
      const userData = await findUser(accessToken, shopID, toID, dispatch, axiosJWT);
      setUserName(userData?.metadata?.user?.name);
      setUserAvatar(userData?.metadata?.user?.thumb);
    };
    fetchUserName();

    messageInputRef.current.focus();

    socket.emit('join_room', shopID + toID);

    // To get notifications when anyone chat to shop
    socket.emit('join_room', shopID);

    socket.on('receive_message', async (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      await getNonRead(accessToken, shopID, dispatch, axiosJWT);
      setCurrentTyping('');
    });

    socket.on('receive_message_history', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
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
  }, [socket, toID]);

  useEffect(() => {
    getHistoryMessage(accessToken, shopID, toID, dispatch, axiosJWT);
    messageInputRef.current.focus();
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
          <ChatList />
        </Col>
        <Col className={cx('content')} md={8}>
          <div className={cx('chatbox')}>
            {historyMessages?.map((msg, index) => (
              <div key={index} className={msg.senderId === shopID ? cx('right', 'chatzone') : cx('left', 'chatzone')}>
                <img className={cx('avatar')} src={msg.senderId === shopID ? shopAvatar : userAvatar} alt="" />
                <div className={cx('content')}>
                  <div className={cx('name')}>{msg.senderId === shopID ? 'You' : userName}</div>
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
                    socket.emit('typing', { roomId: shopID + toID, name: shopName, sender: shopID });
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

export default ShopMessage;
