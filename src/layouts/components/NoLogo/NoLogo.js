import classNames from 'classnames/bind';
import React, { Fragment, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Image';
import ToastMessageContainer from '~/components/ToastMessageContainer';
import Menu from '~/components/Popper/Menu';
import styles from './NoLogo.module.scss';
import {
  AuthenIcon,
  ShopIcon,
  UserIcon,
  ListIcon,
  FavouriteIcon,
  CartIcon,
  ProfileIcon,
  SettingsIcon,
  LogoutIcon,
  HelpIcon,
  ShortcutsIcon,
  LanguageIcon,
  CoinIcon,
  NotificationIcon,
} from '~/components/Icons';
import Search from '../Search';
import CartBlank from '~/components/CartBlank';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByUserID, getCartQuantity, getNonRead, userLogout } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import UserChatList from '~/components/UserChatList';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:810');
const cx = classNames.bind(styles);

const NAVIGATION_ITEMS = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Best sellers',
    to: '/best-seller',
  },
  {
    title: 'New releases',
    to: '/new-releases',
  },
  {
    title: "Today's deals",
    to: '/deals',
  },
  {
    title: 'Products',
    to: '/products',
  },
  {
    title: 'Discount codes',
    to: '/discount-codes',
  },
  {
    title: 'Customer services',
    to: '/customer services',
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

function Header() {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const currentShop = useSelector((state) => state.authShop.signin.currentShop);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const currentCart = useSelector((state) => state?.authUser.getCart.cart);
  const cartProductsQuantity = currentCart?.metadata?.cart_count_products || 0;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);
  const unReadMessage = useSelector((state) => state?.message?.nonReadMessage?.messages);

  useEffect(() => {
    socket.emit('join_room', userID);
    socket.on('receive_message', async (data) => {
      getNonRead(accessToken, userID, dispatch, axiosJWT);
    });
  }, [socket]);

  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const handleLogout = () => {
    userLogout(accessToken, userID, dispatch, navigate, axiosJWT);
    localStorage.clear();
  };

  const handleCart = () => {
    getCartByUserID(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  useEffect(() => {
    getCartQuantity(accessToken, userID, dispatch, axiosJWT);
  }, []);

  const userMenu = [
    {
      icon: <ProfileIcon />,
      title: 'View profile',
      to: '/user/lobby',
    },
    {
      icon: <CoinIcon />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <SettingsIcon />,
      title: 'Setting',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <LogoutIcon />,
      title: 'Log out',
      to: '/user/signin',
      separate: true,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    socket.emit('join_room', userID);
    socket.on('receive_message', async (data) => {
      getNonRead(accessToken, userID, dispatch, axiosJWT);
    });
  }, [socket]);

  return (
    <header className={cx('wrapper')}>
      <ToastMessageContainer></ToastMessageContainer>
      {/* Navigation */}
      <div className={cx('inner')}>
        <button className={cx('action-btn')}>
          <ListIcon /> <p className={cx('navigation-item')}>All</p>
        </button>
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
          {currentUser || currentShop ? (
            <Fragment>
              <div className={cx('current-user')}>
                <button className={cx('action-btn')}>
                  <CartIcon onClick={handleCart} />
                  <span className={cx('quantity')}>{cartProductsQuantity}</span>
                </button>
                <Tippy content="Favourite" placement="bottom" trigger="click" delay={[0, 200]}>
                  <button className={cx('action-btn')}>
                    <FavouriteIcon />
                  </button>
                </Tippy>
                <HeadlessTippy
                  appendTo={document.body}
                  interactive
                  placement="bottom"
                  render={(attrs) => (
                    <div className={cx('chat-container')} tabIndex={-1} {...attrs}>
                      <PopperWrapper>
                        <UserChatList />
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

              <HeadlessTippy
                interactive
                placement="bottom"
                render={(attrs) => (
                  <div className={cx('signin-role')} {...attrs}>
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
            </>
          )}
          <Menu items={currentUser || currentShop ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <HeadlessTippy placement="top">
                <Image
                  className={cx('user-avatar')}
                  src={currentUser?.metadata.user.thumb}
                  alt={currentUser?.metadata.user.name}
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

export default Header;
