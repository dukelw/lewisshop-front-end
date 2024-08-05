import classNames from 'classnames/bind';
import React from 'react';
import 'tippy.js/dist/tippy.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createAxios } from '~/createAxios';

import { findUser } from '~/redux/apiRequest';
import { DotIcon } from '~/components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { getLatest } from '~/redux/apiRequest';
import styles from './ShopChatList.module.scss';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:810');

const cx = classNames.bind(styles);

function ShopChatList() {
  const { toID } = useParams();
  const currentShop = useSelector((state) => state?.authShop.signin.currentShop);
  const shopID = currentShop?.metadata.shop._id;
  const historyMessages = useSelector((state) => state?.message.getAllNonReadUserMessages.messages);
  const unReadMessage = useSelector((state) => state?.message?.nonReadMessage?.messages);
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentShop);
  const [messagesWithUserDetails, setMessagesWithUserDetails] = useState([]);

  useState(() => {
    getLatest(accessToken, shopID, dispatch, axiosJWT);
  }, []);

  const fetchUserDetails = async () => {
    const updatedMessages = await Promise.all(
      historyMessages.map(async (message) => {
        const user = await findUser(accessToken, shopID, message.senderId, dispatch, axiosJWT);
        return { ...message, user };
      }),
    );
    setMessagesWithUserDetails(updatedMessages);
  };

  useEffect(() => {
    if (historyMessages?.length) {
      fetchUserDetails();
      console.log(messagesWithUserDetails);
    }
  }, [historyMessages, socket, toID]);

  useEffect(() => {
    // Join the notification room
    socket.emit('join_room', shopID);

    socket.on('receive_message', async (data) => {
      getLatest(accessToken, shopID, dispatch, axiosJWT);
      fetchUserDetails();
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket, historyMessages, messagesWithUserDetails]);

  const isNews = (message) => {
    return unReadMessage?.some(
      (msg) => msg.senderId === message.senderId && msg.receiverId === message.receiverId && message.isRead === false,
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
        message.senderId !== shopID ? (
          <Link key={index} to={`/shop/chat/${message.senderId}`}>
            <li className={cx('chat-item', toID === message.senderId ? 'current' : '')}>
              <img className={cx('chat-user-thumb')} src={message?.user?.metadata?.user?.thumb} alt="" />
              <div className={cx('chat-user-info')}>
                <h4 className={cx('chat-user-name')}>{message?.user?.metadata?.user?.name}</h4>
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

export default ShopChatList;
