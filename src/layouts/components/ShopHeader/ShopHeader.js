import classNames from 'classnames/bind';
import React, { Fragment, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '~/createAxios';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import OffCanvas from '~/components/OffCanvas';
import styles from './ShopHeader.module.scss';
import {
  AuthenIcon,
  ShopIcon,
  LogoIconDark,
  UserIcon,
  ListIcon,
  ProfileIcon,
  CartIcon,
  LogoutIcon,
  HelpIcon,
  ShortcutsIcon,
  LanguageIcon,
  NotificationIcon,
  BookmarkIcon,
  ClockIcon,
} from '~/components/Icons';
import Search from '../Search';
import CartBlank from '~/components/CartBlank';
import { useDispatch, useSelector } from 'react-redux';
import { getNonRead, logout } from '~/redux/apiRequest';
import ShopChatList from '~/components/ShopChatList';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:810');
const cx = classNames.bind(styles);

const NAVIGATION_ITEMS = [
  {
    title: 'Courses',
    to: '/shop/courses',
  },
  {
    title: 'Events',
    to: '/shop/events',
  },
  {
    title: 'Topics',
    to: '/shop/topics',
  },
  {
    title: 'Blogs',
    to: '/shop/blogs',
  },
];

const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <HelpIcon />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <ShortcutsIcon />,
    title: 'Keyboard shortcut',
  },
];

function ShopHeader() {
  const currentShop = useSelector((state) => state.authShop.signin.currentShop);
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentShop);
  const unReadMessage = useSelector((state) => state?.message?.nonReadMessage?.messages);
  const historyMessages = useSelector((state) => state?.message.getHistoryMessage.messages);

  const handleMenuChange = (menuItem) => {
    // console.log(menuItem);
  };

  const handleLogout = () => {
    logout(accessToken, shopID, dispatch, navigate, axiosJWT);
  };

  const userMenu = [
    {
      icon: <ProfileIcon />,
      title: 'Your shop',
      to: '/shop/lobby',
    },
    {
      icon: <BookmarkIcon padding="0" />,
      title: 'Marked List',
      to: '/mark',
    },
    {
      icon: <ClockIcon padding="0" />,
      title: 'Activities history',
      to: '/history',
    },
    ...MENU_ITEMS,
    {
      icon: <LogoutIcon />,
      title: 'Log out',
      to: '/shop',
      separate: true,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    // To get notifications when anyone chat to shop
    socket.emit('join_room', shopID);

    socket.on('receive_message', async (data) => {
      await getNonRead(accessToken, shopID, dispatch, axiosJWT);
    });
  }, [socket]);

  return (
    <header className={cx('wrapper')}>
      {/* Logo */}
      <Link to={config.routes.shopHome} className={cx('logo-link')}>
        <div className={cx('logo')}>
          <LogoIconDark />
        </div>
      </Link>
      {/* Navigation */}

      <div className={cx('inner')}>
        <OffCanvas Icon={ListIcon} content={'All'} classNames={'navigation-item'}></OffCanvas>
        <Search />
        <ul className={cx('navigation-list')}>
          {NAVIGATION_ITEMS.map((item, index) => {
            return (
              <li key={index} className={cx('navigation-item')}>
                <Link to={item.to} className={cx('navigation-link')}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={cx('actions')}>
          {currentShop ? (
            <Fragment>
              <div className={cx('current-user')}>
                <HeadlessTippy
                  appendTo={document.body}
                  interactive
                  placement="bottom"
                  render={(attrs) => (
                    <div className={cx('chat-container')} tabIndex={-1} {...attrs}>
                      <PopperWrapper>
                        <ShopChatList />
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <button className={cx('action-btn')}>
                    <NotificationIcon />
                    <span className={cx('nonread-number')}>
                      {unReadMessage?.length > 0 ? unReadMessage?.length : ''}
                    </span>
                  </button>
                </HeadlessTippy>
              </div>
            </Fragment>
          ) : (
            // When does not signin
            <>
              <HeadlessTippy
                appendTo={document.body}
                interactive
                placement="bottom"
                render={(attrs) => (
                  <div className={cx('cart-result')} tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                      <CartBlank />
                    </PopperWrapper>
                  </div>
                )}
              >
                <button className={cx('action-btn')}>
                  <CartIcon />
                </button>
              </HeadlessTippy>

              <Fragment>
                <HeadlessTippy
                  appendTo={document.body}
                  interactive
                  placement="bottom"
                  render={(attrs) => (
                    <div className={cx('signin-role')} tabIndex={-1} {...attrs}>
                      <PopperWrapper>
                        <Link to={'/user/signin'}>
                          <button className={cx('action-btn')}>
                            <UserIcon />
                            <span className={cx('role')}>Signin as User</span>
                          </button>
                        </Link>
                        <Link to={'/shop/signin'}>
                          <button className={cx('action-btn')}>
                            <ShopIcon />
                            <span className={cx('role')}>Signin as Shop</span>
                          </button>
                        </Link>
                      </PopperWrapper>
                    </div>
                  )}
                >
                  <button className={cx('action-btn')}>
                    <AuthenIcon></AuthenIcon>
                  </button>
                </HeadlessTippy>
              </Fragment>
            </>
          )}
          <Menu items={currentShop ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentShop ? (
              <HeadlessTippy placement="top">
                <Image
                  className={cx('user-avatar')}
                  src={currentShop?.metadata.shop.thumb}
                  alt={currentShop?.metadata.shop.name}
                  fallback="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5577ddc3-7a38-4931-8d27-eba1cd94be70/dewdki6-8b9dfaa0-3980-42cb-882c-87abd7cc21b7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU1NzdkZGMzLTdhMzgtNDkzMS04ZDI3LWViYTFjZDk0YmU3MFwvZGV3ZGtpNi04YjlkZmFhMC0zOTgwLTQyY2ItODgyYy04N2FiZDdjYzIxYjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cRkFHWQdZOmHE3GJuwFIeMyRc6tloD_NVkow2hKLHs4"
                />
              </HeadlessTippy>
            ) : (
              <button className={cx('more-btn')}>
                <ListIcon />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
