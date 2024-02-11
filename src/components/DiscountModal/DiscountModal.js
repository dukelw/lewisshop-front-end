import React from 'react';
import classNames from 'classnames/bind';
import styles from './DiscountModal.module.scss';
import { XMarkIcon } from '../Icons';
import Button from '../Button';

const cx = classNames.bind(styles);

const DiscountModal = ({ discountCodes, onSelectDiscount, handleDisplay, currentCheckout }) => {
  const validDiscounts = currentCheckout?.metadata.shop_order_ids.map((shop) => {
    const totalPrice = shop.item_products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    const foundShop = discountCodes.find((shopDiscount) => shopDiscount.shop_id === shop.shop_id);
    const discounts = foundShop.shop_discount.filter((discount) => {
      return discount.minimum <= totalPrice;
    });

    return {
      shop_id: foundShop.shop_id,
      shop_name: foundShop.shop_name,
      shop_discounts: discounts,
    };
  });

  const inValidDiscounts = currentCheckout?.metadata.shop_order_ids.map((shop) => {
    const totalPrice = shop.item_products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    const foundShop = discountCodes.find((shopDiscount) => shopDiscount.shop_id === shop.shop_id);
    const discounts = foundShop.shop_discount.filter((discount) => {
      return discount.minimum > totalPrice;
    });

    return {
      shop_id: foundShop.shop_id,
      shop_name: foundShop.shop_name,
      shop_discounts: discounts,
    };
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h1>Choose a discount code</h1>
        <XMarkIcon onClick={handleDisplay}></XMarkIcon>
      </div>
      <div className={cx('body')}>
        <ul className={cx('list')}>
          {discountCodes.map((data, index) => (
            <li className={cx('item')} key={data.shop_id}>
              <h2>{data.shop_name}</h2>
              {validDiscounts[index].shop_discounts.map((discount) => {
                return (
                  <div key={discount._id} className={cx('discount')}>
                    <div className={'text'}>
                      <p className={cx('code')}>{discount.code}</p>
                      <p className={cx('name')}>{discount.name}</p>
                    </div>
                    <Button primary onClick={() => onSelectDiscount(discount.code, discount._id, data.shop_id)}>
                      Use
                    </Button>
                  </div>
                );
              })}
              {inValidDiscounts[index].shop_discounts.map((discount) => {
                return (
                  <div key={discount._id} className={cx('discount')}>
                    <div className={'text'}>
                      <p className={cx('code')}>{discount.code}</p>
                      <p className={cx('name')}>{discount.name}</p>
                    </div>
                    <Button disabled onClick={() => onSelectDiscount(discount.code, discount._id, data.shop_id)}>
                      Min: {discount.minimum}
                    </Button>
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscountModal;
