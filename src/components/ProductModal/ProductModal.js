import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductModal.module.scss';
import ShopProductContainer from '../ShopProductContainer';
import { createAxios } from '~/createAxios';
import Button from '../Button';
import { getAllProductOfShop } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function ProductModal({ onDataChange, text = 'Modal' }) {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];
  const axiosJWT = createAxios(shop);

  useEffect(() => {
    if (shop) {
      getAllProductOfShop(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, dispatch, axiosJWT);
    }
  }, []);
  const [show, setShow] = useState(false);
  let applyProduct = [];

  const handleApply = (e, id, name) => {
    e.preventDefault();
    if (!applyProduct.includes(id)) {
      applyProduct.push({ id, name });
    }
    console.log(applyProduct);
  };

  const handleUnapply = (e, id, name) => {
    e.preventDefault();
    applyProduct = applyProduct.filter((item) => item.id !== id);
    console.log(applyProduct);
  };

  const sendDataToShopCreateDiscount = () => {
    const data = applyProduct;
    onDataChange(data);
    setShow(false);
  };

  return (
    <>
      <Button outline onClick={() => setShow(true)}>
        {text}
      </Button>

      <Modal
        centered
        show={show}
        onHide={() => setShow(false)}
        backdropClassName={cx('body')}
        dialogClassName={cx('container')}
        contentClassName={cx('wrapper')}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header bsPrefix={cx('header')} closeButton>
          <Modal.Title className={cx('title')} id="example-custom-modal-styling-title">
            Choose Product To Apply Discount Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShopProductContainer
            products={data}
            axiosJWT={axiosJWT}
            discountApplyEnable={true}
            handleApply={handleApply}
            handleUnapply={handleUnapply}
            small={true}
          ></ShopProductContainer>
        </Modal.Body>
        <Modal.Footer bsPrefix={cx('footer')}>
          <Button className={cx('finish')} onClick={sendDataToShopCreateDiscount} outline>
            Finish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductModal;
