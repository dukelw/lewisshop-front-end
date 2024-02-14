import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import styles from './DiscountEditModal.module.scss';
import ShopCreateDiscount from '../ShopCreateDiscount';

const cx = classNames.bind(styles);

function DiscountInfoModal({ children, data }) {
  const [show, setShow] = useState(false);
  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => setShow(true) })}

      <Modal
        show={show}
        onHide={() => {
          localStorage.removeItem('formData');
          setShow(false);
        }}
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
          <ShopCreateDiscount isEdit={true} editDiscount={data} onCloseModal={handleCloseModal}></ShopCreateDiscount>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DiscountInfoModal;
