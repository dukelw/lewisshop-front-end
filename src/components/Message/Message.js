import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Col, Container, Row, Form, FormControl, InputGroup, Spinner, Modal } from 'react-bootstrap';

import io from 'socket.io-client';
import { findShopByID, getHistoryMessage, getNonRead, markAsRead } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import styles from './Message.module.scss';
import UserChatList from '../UserChatList';
import usePreviewImage from '~/hooks/usePreviewImage';
import { ImageIcon, PaperPlanIcon } from '../Icons';
import { convertToVietnamTime } from '~/utils/timeConverter';

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
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage();

  const sendMessage = async () => {
    const messageData = {
      roomId: toID + userID,
      senderId: userID,
      receiverId: toID,
      message: newMessage,
      image: imgUrl,
    };
    console.log('Image from React: ' + imgUrl);
    await socket.emit('send_message', messageData);
    await socket.emit('send_message', { roomId: toID, message: 'Notification' });
    const result = await markAsRead(accessToken, toID, userID, dispatch, axiosJWT);
    console.log('Shop ID: ' + userID, ' toID: ' + toID, ' result: ' + result);
    setNewMessage('');
    setImgUrl('');
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
  }, [socket, toID]);

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
                  {msg.image ? <img className={cx('attached-image')} src={msg.image} alt="Attachment" /> : ''}
                  <div className={cx('message')}>{msg.message}</div>
                  <span className={cx('time')}>{convertToVietnamTime(msg.timestamp)}</span>
                </div>
              </div>
            ))}
            <span>{currentTyping}</span>
            {loading && (
              <div className={cx('loading')}>
                <p>Sending the image...</p>
                <Spinner animation="border" className={cx('circling')} />
              </div>
            )}
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
                <PaperPlanIcon
                  onClick={() => {
                    if (newMessage) {
                      sendMessage();
                    }
                  }}
                  padding={20}
                  primary
                  type="submit"
                >
                  Send
                </PaperPlanIcon>
                <InputGroup className={cx('image-input')}>
                  <ImageIcon padding={20} onClick={() => imageRef.current.click()} />
                  <input onChange={handleImageChange} width={0} type="file" hidden ref={imageRef}></input>
                </InputGroup>
              </InputGroup>
              <Modal show={imgUrl} onHide={() => setImgUrl('')}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <img className={cx('preview-img')} src={imgUrl} alt="Review" />
                </Modal.Body>
                <Modal.Footer className={cx('img-description')}>
                  <FormControl
                    type="text"
                    placeholder="Type your message"
                    value={newMessage}
                    ref={messageInputRef}
                    onChange={(e) => {
                      socket.emit('typing', { roomId: toID + userID, name: shopName, sender: userID });
                      setNewMessage(e.target.value);
                    }}
                    className={cx('img-description-input')}
                  />
                  <PaperPlanIcon
                    onClick={async () => {
                      if (newMessage) {
                        setLoading(true);
                        await sendMessage();
                        setImgUrl('');
                        setLoading(false);
                      }
                    }}
                    padding={20}
                    primary
                    type="submit"
                  ></PaperPlanIcon>
                </Modal.Footer>
              </Modal>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
