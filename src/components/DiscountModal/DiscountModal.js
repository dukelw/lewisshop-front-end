import React from 'react';
import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './DiscountModal.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

const DiscountModal = ({
  children,
  discountCodes = [],
  onSelectDiscount = () => {},
  currentCheckout = [],
  isDisplay = false,
  hide,
  className,
}) => {
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const userID = currentUser?.metadata.user._id;
  const validDiscounts = currentCheckout?.metadata?.shop_order_ids?.map((shop) => {
    const totalPrice = shop.item_products?.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    const foundShop = discountCodes.find((shopDiscount) => shopDiscount?.shop_id === shop?.shop_id);
    let discounts = foundShop?.shop_discount?.filter((discount) => {
      return discount.minimum <= totalPrice;
    });

    // Check uses time of user
    discounts = discounts?.map((discount) => {
      const usedCount = discount.userUsed?.filter((user) => user === userID);
      return usedCount < discount.maxUse ? discount : {};
    });

    discounts = discounts?.filter((item) => Object.keys(item).length !== 0);

    return {
      shop_id: foundShop?.shop_id,
      shop_name: foundShop?.shop_name,
      shop_discounts: discounts,
    };
  });

  const inValidDiscounts = currentCheckout?.metadata?.shop_order_ids?.map((shop) => {
    const totalPrice = shop.item_products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    const foundShop = discountCodes.find((shopDiscount) => shopDiscount?.shop_id === shop?.shop_id);
    const discounts = foundShop?.shop_discount?.filter((discount) => {
      return discount.minimum > totalPrice;
    });

    return {
      shop_id: foundShop?.shop_id,
      shop_name: foundShop?.shop_name,
      shop_discounts: discounts,
    };
  });

  const classes = cx('', {
    [className]: className,
  });

  return (
    <div className={classes}>
      {React.cloneElement(children)}
      <Modal
        show={isDisplay}
        onHide={hide}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName={cx('wrapper')}
        contentClassName={cx('inner')}
      >
        <Modal.Header className={cx('header')} closeButton>
          <Modal.Title className={cx('heading')}>
            <h1 className={cx('title')}>Choose a discount code</h1>
            <span className={cx('description')}>You can choose 1 code of each shop</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx('body')}>
          <ul className={cx('list')}>
            {discountCodes
              ? discountCodes?.map((data, index) => (
                  <li className={cx('item')} key={data?.shop_id}>
                    <h2>{data.shop_name}</h2>
                    {validDiscounts &&
                      validDiscounts[index]?.shop_discounts?.map((discount) => {
                        return (
                          <div key={discount._id} className={cx('discount')}>
                            <div className={'text'}>
                              <p className={cx('code')}>{discount.code}</p>
                              <p className={cx('name')}>{discount.name}</p>
                            </div>
                            <Button
                              primary
                              onClick={() => onSelectDiscount(discount?.code, discount?._id, data?.shop_id)}
                            >
                              Use
                            </Button>
                          </div>
                        );
                      })}
                    {inValidDiscounts &&
                      inValidDiscounts[index]?.shop_discounts?.map((discount) => {
                        return (
                          <div key={discount._id} className={cx('discount')}>
                            <div className={'text'}>
                              <p className={cx('code')}>{discount.code}</p>
                              <p className={cx('name')}>{discount.name}</p>
                            </div>
                            <Button
                              disabled
                              onClick={() => onSelectDiscount(discount?.code, discount?._id, data?.shop_id)}
                            >
                              Min: {discount.minimum}
                            </Button>
                          </div>
                        );
                      })}
                  </li>
                ))
              : ''}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DiscountModal;
