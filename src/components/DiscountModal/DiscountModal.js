import React from 'react';
import classNames from 'classnames/bind';
import styles from './DiscountModal.module.scss';
import { XMarkIcon } from '../Icons';
import Button from '../Button';

const cx = classNames.bind(styles);

const DiscountModal = ({ discountCodes, onSelectDiscount, handleDisplay }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h1>Choose a discount code</h1>
        <XMarkIcon onClick={handleDisplay}></XMarkIcon>
      </div>
      <div className={cx('body')}>
        <ul className={cx('list')}>
          {discountCodes.map((data) => (
            <li className={cx('item')} key={data.shop_id}>
              <h2>{data.shop_name}</h2>
              {data.shop_discount.map((discount) => {
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscountModal;
