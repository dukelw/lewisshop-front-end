import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './OrderInfoModal.module.scss';
import { Link } from 'react-router-dom';
import {
  LandMineOnIcon,
  MoneyBillIcon,
  PercentIcon,
  DongIcon,
  ProductHuntIcon,
  AddressBookIcon,
  CreditCardIcon,
  BarCodeIcon,
  UserIcon,
} from '../Icons';

const cx = classNames.bind(styles);

function OrderInfoModal({ children, data, code, onDetailClick }) {
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const shopID = currentShop?.metadata.shop._id;
  const foundUser = useSelector((state) => state?.authUser.findUser.foundUser);
  const user = foundUser?.metadata.user;
  const [show, setShow] = useState(false);

  const handleProductDetail = (productID, shopID, productType) => {
    localStorage.setItem('productDetailID', productID);
    localStorage.setItem('productShopID', shopID);
    localStorage.setItem('productType', productType);
  };

  return (
    <>
      {React.cloneElement(children, {
        onClick: () => {
          onDetailClick(data);
          setShow(true);
        },
      })}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName={cx('wrapper')}
        contentClassName={cx('inner')}
      >
        <Modal.Header className={cx('heading')} closeButton>
          <Modal.Title className={cx('header')} id="example-custom-modal-styling-title">
            Order {moment(data.createdAt).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <LandMineOnIcon />
              Status
            </p>
            <p className={cx('text')}>
              <span className={cx('active')}>{data.order_status}</span>
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <CreditCardIcon /> Payment
            </p>
            <p className={cx('text')}>
              {data.order_type === 'percentage' ? <PercentIcon className={cx('type')} /> : data.order_payment}
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <AddressBookIcon />
              Address
            </p>
            <p className={cx('text', 'text-limit')}>{data.order_shipping}</p>
          </div>
          <div className={cx('group', 'products-group')}>
            <p className={cx('title')}>
              <ProductHuntIcon />
              Product
            </p>
            <div className={cx('products')}>
              {data.order_products[0].item_products.map((product, index) => (
                <div
                  className={cx('redirect')}
                  key={index}
                  onClick={() => handleProductDetail(product.product_id, shopID, product.type)}
                >
                  <Link className={cx('link')} key={index} to={`/product/${product.slug}`}>
                    <li>{product.name}</li>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <MoneyBillIcon />
              Subtotal
            </p>
            <p className={cx('text')}>
              {data.order_products[0].rawPrice}
              <DongIcon className={cx('type')}></DongIcon>
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <BarCodeIcon />
              Voucher
            </p>
            <p className={cx('text')}>{code.length === 0 ? 'None' : code[0].code}</p>
          </div>
          {code.length !== 0 && (
            <div className={cx('group')}>
              <p className={cx('title')}>
                <MoneyBillIcon />
                Discount
              </p>
              <p className={cx('text')}>
                {data.order_products[0].rawPrice - data.order_products[0].appliedDiscountPrice}
                <DongIcon className={cx('type')}></DongIcon>
              </p>
            </div>
          )}
          <div className={cx('group')}>
            <p className={cx('title')}>
              <MoneyBillIcon />
              Total
            </p>
            <p className={cx('text')}>
              {data.order_products[0].appliedDiscountPrice}
              <DongIcon className={cx('type')}></DongIcon>
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <UserIcon />
              Customer
            </p>
            <Link className={cx('user')} to={`/user/${user.name}`}>
              <img alt="User Avatar" src={user.thumb} className={cx('avatar')}></img>
              <div className={cx('info')}>
                <span className={cx('name')}>{user.name}</span>
                <span className={cx('address')}>{user.phone_number}</span>
                <span className={cx('address')}>{user.email}</span>
              </div>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderInfoModal;
