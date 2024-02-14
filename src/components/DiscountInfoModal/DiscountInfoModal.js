import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './DiscountInfoModal.module.scss';
import {
  LandMineOnIcon,
  MoneyBillIcon,
  PercentIcon,
  DongIcon,
  MintBitIcon,
  LayerGroupIcon,
  TimeLineIcon,
  UsersIcon,
  ProductHuntIcon,
  HourGlassStartIcon,
  HourGlassEndIcon,
  BarCodeIcon,
} from '../Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function DiscountInfoModal({ children, data }) {
  const currentAppliedProducts = useSelector((state) => state.products.IDsProducts.foundProducts);
  const appliedProducts = currentAppliedProducts?.metadata;
  const [show, setShow] = useState(false);
  const handleProductDetail = (productID, shopID, productType) => {
    localStorage.setItem('productDetailID', productID);
    localStorage.setItem('productShopID', shopID);
    localStorage.setItem('productType', productType);
  };

  console.log('Applied', appliedProducts);

  return (
    <>
      {React.cloneElement(children, { onClick: () => setShow(true) })}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName={cx('wrapper')}
        contentClassName={cx('inner')}
      >
        <Modal.Header className={cx('heading')} closeButton>
          <Modal.Title className={cx('header')} id="example-custom-modal-styling-title">
            {data.discount_name}
            <p className={cx('description')}>{data.discount_description}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <LandMineOnIcon />
              Status
            </p>
            <p className={cx('text')}>
              {data.discount_is_active ? (
                <span className={cx('active')}>active</span>
              ) : (
                <span className={cx('inactive')}>inactive</span>
              )}
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <LayerGroupIcon /> Type
            </p>
            <p className={cx('text')}>
              {data.discount_type === 'percentage' ? (
                <PercentIcon className={cx('type')} />
              ) : (
                <DongIcon className={cx('type')}></DongIcon>
              )}
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <BarCodeIcon />
              Code
            </p>
            <p className={cx('text')}>{data.discount_code}</p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <MoneyBillIcon />
              Value
            </p>
            <p className={cx('text')}>
              {data.discount_value}
              {data.discount_type === 'percentage' ? (
                <PercentIcon className={cx('type')} />
              ) : (
                <DongIcon className={cx('type')}></DongIcon>
              )}
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <MintBitIcon />
              Min
            </p>
            <p className={cx('text')}>
              {data.discount_min_order_value} <DongIcon className={cx('type')}></DongIcon>
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <TimeLineIcon />
              Max uses
            </p>
            <p className={cx('text')}>{data.discount_max_uses}</p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <UsersIcon />
              Max uses per user
            </p>
            <p className={cx('text')}>{data.discount_max_uses_per_user}</p>
          </div>
          <div className={cx('group', 'products-group')}>
            <p className={cx('title')}>
              <ProductHuntIcon />
              Apply to
            </p>
            <p className={cx('products')}>
              {data.discount_applies_to === 'all' ? (
                <li>All</li>
              ) : (
                appliedProducts?.map((product, index) => (
                  <div onClick={() => handleProductDetail(product._id, product.product_shop, product.product_type)}>
                    <Link key={index} to={`/product/${product.product_slug}`}>
                      <li>{product.product_name}</li>
                    </Link>
                  </div>
                ))
              )}
            </p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <HourGlassStartIcon />
              Valid from
            </p>
            <p className={cx('text')}>{data.discount_start_date}</p>
          </div>
          <div className={cx('group')}>
            <p className={cx('title')}>
              <HourGlassEndIcon />
              Valid to
            </p>
            <p className={cx('text')}>{data.discount_end_date}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DiscountInfoModal;
