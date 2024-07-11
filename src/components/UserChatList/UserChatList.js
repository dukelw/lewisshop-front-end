import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createAxios';
import { findShopByID, markAsRead, getLatest } from '~/redux/apiRequest';
import { DotIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './UserChatList.module.scss';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:810');
const cx = classNames.bind(styles);

function UserChatList() {
  const { toID } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata?.user?._id;
  const historyMessages = useSelector((state) => state?.message.getAllNonReadUserMessages.messages);
  const unReadMessage = useSelector((state) => state?.message?.nonReadMessage?.messages);
  const axiosJWT = createAxios(currentUser);
  const [messagesWithUserDetails, setMessagesWithUserDetails] = useState([]);

  // Fetch latest messages and mark as read when toID changes
  useEffect(() => {
    getLatest(accessToken, userID, dispatch, axiosJWT);
    markAsRead(accessToken, toID, userID, dispatch, axiosJWT);
  }, [toID]);

  // Fetch user details when historyMessages change
  useEffect(() => {
    const fetchUserDetails = async () => {
      const updatedMessages = await Promise.all(
        historyMessages.map(async (message) => {
          const user = await findShopByID(message.senderId, dispatch, axiosJWT);
          return { ...message, user };
        }),
      );
      setMessagesWithUserDetails(updatedMessages);
    };

    if (historyMessages?.length) {
      fetchUserDetails();
    }
  }, [historyMessages]);

  // Set up socket listeners once
  useEffect(() => {
    socket.emit('join_room', userID);

    socket.on('receive_message', async () => {
      getLatest(accessToken, userID, dispatch, axiosJWT);
      const fetchUserDetails = async () => {
        const updatedMessages = await Promise.all(
          historyMessages.map(async (message) => {
            const user = await findShopByID(message.senderId, dispatch, axiosJWT);
            return { ...message, user };
          }),
        );
        setMessagesWithUserDetails(updatedMessages);
      };
      await fetchUserDetails();
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const isNews = (message) => {
    return unReadMessage.some(
      (msg) => msg.senderId === message.senderId && msg.receiverId === message.receiverId && !message.isRead,
    );
  };

  return (
    <div className={cx('chatbox')}>
      <div className={cx('note')}>
        <div className={cx('status-item')}>
          <DotIcon className={cx('nonread')} />
          <span className={cx('nonread')}>Have not been read</span>
        </div>
        <div className={cx('status-item')}>
          <DotIcon />
          <span>Read</span>
        </div>
      </div>
      {messagesWithUserDetails.map((message, index) =>
        message.senderId !== userID ? (
          <Link key={index} to={`/User/chat/${message.senderId}`}>
            <li className={cx('chat-item', toID === message.senderId ? 'current' : '')}>
              <img className={cx('chat-user-thumb')} src={message?.user?.metadata?.thumb} alt="" />
              <div className={cx('chat-user-info')}>
                <h4 className={cx('chat-user-name')}>{message?.user?.metadata?.name}</h4>
                <p className={cx('chat-user-message')}>{message.message}</p>
              </div>
              <span className={cx('chat-user-status', isNews(message) ? 'nonread' : 'hide')}>
                <DotIcon />
              </span>
            </li>
          </Link>
        ) : (
          ''
        ),
      )}
    </div>
  );
}

export default UserChatList;
