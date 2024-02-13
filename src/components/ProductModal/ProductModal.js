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
  const formData = JSON.parse(localStorage.getItem('formData'));
  const appliedProducts = JSON.parse(localStorage.getItem('formData'))?.discount_product_ids;

  useEffect(() => {
    if (shop) {
      getAllProductOfShop(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, dispatch, axiosJWT);
    }
  }, []);

  const [show, setShow] = useState(false);
  const [applyProduct, setApplyProduct] = useState([]);

  const handleApply = (e, id, name) => {
    e.preventDefault();

    if (!applyProduct.some((item) => item.id === id)) {
      setApplyProduct((prevApplyProduct) => [...prevApplyProduct, { id, name }]);
    } else {
      console.log('Product has been apply');
    }
  };

  const handleUnapply = (e, id) => {
    e.preventDefault();
    setApplyProduct((prevApplyProduct) => prevApplyProduct.filter((item) => item.id !== id));
    if (formData) {
      const newAppliedProducts = appliedProducts.filter((item) => item !== id);
      const newFormData = {
        ...formData,
        discount_product_ids: newAppliedProducts,
      };
      localStorage.removeItem('formData');
      localStorage.setItem('formData', JSON.stringify(newFormData));
    }
  };

  const sendDataToShopCreateDiscount = () => {
    onDataChange(applyProduct);
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
