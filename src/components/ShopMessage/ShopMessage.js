import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Col, Container, Row, Form, FormControl, InputGroup, Modal, Spinner } from 'react-bootstrap';

import { findUser, getHistoryMessage, getNonRead, markAsRead } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import styles from './ShopMessage.module.scss';
import ChatList from '../ShopChatList';
import { ImageIcon, PaperPlanIcon } from '../Icons';
import usePreviewImage from '~/hooks/usePreviewImage';
import { convertToVietnamTime } from '~/utils/timeConverter';

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
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage();

  const sendMessage = async () => {
    // setLoading(true);
    const messageData = {
      roomId: shopID + toID,
      senderId: shopID,
      receiverId: toID,
      message: newMessage,
      image: imgUrl,
    };
    console.log('Image from React: ' + imgUrl);
    await socket.emit('send_message', messageData);
    await socket.emit('send_message', { roomId: toID, message: 'Notification' });
    const result = await markAsRead(accessToken, toID, shopID, dispatch, axiosJWT);
    console.log('Shop ID: ' + shopID, ' toID: ' + toID, ' result: ' + result);
    setNewMessage('');
    setImgUrl('');
    // setLoading(false);
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
              }
            }}
          >
            <Col md={8}>
              <InputGroup className={cx('typing')}>
                <FormControl
                  type="text"
                  placeholder="Type your message"
                  value={newMessage}
                  onChange={(e) => {
                    socket.emit('typing', { roomId: shopID + toID, name: shopName, sender: shopID });
                    setNewMessage(e.target.value);
                  }}
                  ref={messageInputRef}
                  className={cx('input')}
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
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Type your message"
                      value={newMessage}
                      ref={messageInputRef}
                      onChange={(e) => {
                        socket.emit('typing', { roomId: shopID + toID, name: shopName, sender: shopID });
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
                  </InputGroup>
                </Modal.Footer>
              </Modal>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ShopMessage;
