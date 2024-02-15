import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './DeleteConfirm.module.scss';
import { createAxios } from '~/createAxios';
import { deleteDiscount, destroyDiscount } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function DeleteConfirm({ children, discount_code, isDestroy = false, discount_id }) {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const axiosJWT = createAxios(currentShop);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    if (!isDestroy) {
      deleteDiscount(accessToken, shopID, discount_code, dispatch, axiosJWT);
    } else {
      destroyDiscount(accessToken, shopID, discount_id, dispatch, axiosJWT);
    }
    handleClose();
  };

  return (
    <>
      {React.cloneElement(children, { onClick: () => handleShow() })}

      <Modal contentClassName={cx('inner')} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={cx('title')}>Are you sure to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx('body')}>
          {isDestroy
            ? 'The voucher will be deleted permanently and can not be restored'
            : 'Your voucher will be sent to the dustbin. You can access dustbin to restore'}
        </Modal.Body>
        <Modal.Footer>
          <Button className={cx('button')} variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className={cx('button')} variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirm;
