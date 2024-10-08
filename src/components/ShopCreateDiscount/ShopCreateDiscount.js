import React, { useRef, useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ShopCreateDiscount.module.scss';
import Button from '../Button';
import { createNewDiscount, updateDiscount, getDiscountsOfShopByUser } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '~/createAxios';
import ProductModal from '../ProductModal';

const cx = classNames.bind(styles);

const ShopCreateDiscount = ({ isEdit = false, editDiscount = {}, onCloseModal = () => {} }) => {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const accessToken = shop?.metadata.tokens.accessToken;
  const shopID = shop?.metadata.shop._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(shop);
  const [discountType, setDiscountType] = useState('');
  const [applyTo, setApplyTo] = useState('specific');
  const [applyProduct, setApplyProduct] = useState([]);

  const handleDiscountType = (event) => {
    const type = event.target.value;
    setDiscountType(type);
    setFormData({
      ...formData,
      discount_type: type,
    });
  };

  const handleProductDetail = (productID, shopID, productType) => {
    localStorage.setItem('productDetailID', productID);
    localStorage.setItem('productShopID', shopID);
    localStorage.setItem('productType', productType);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  };

  const handleApplyTo = (event) => {
    const type = event.target.value;
    setApplyTo(type);
    setFormData({
      ...formData,
      discount_type: type,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const convertedFormData = {
      ...formData,
      discount_start_date: formatDate(formData.discount_start_date),
      discount_end_date: formatDate(formData.discount_end_date),
    };

    if (shop) {
      if (isEdit) {
        updateDiscount(accessToken, shopID, convertedFormData, dispatch, navigate, axiosJWT);
        getDiscountsOfShopByUser(accessToken, shopID, shopID, dispatch, axiosJWT);
      } else {
        createNewDiscount(accessToken, shopID, convertedFormData, dispatch, navigate, axiosJWT);
      }
    } else {
      navigate('/shop/signin');
    }

    // Focus name
    nameRef.current.focus();

    // Close modal if is being edited
    if (isEdit) {
      onCloseModal();
    }

    // Remove formData from localStorage
    return () => {
      localStorage.removeItem('formData');
    };
  };

  const nameRef = useRef(null);
  const initialState = JSON.parse(localStorage.getItem('formData')) || {
    discount_name: '',
    discount_description: '',
    discount_type: 'fixed_amount',
    discount_value: 0,
    discount_max_value: 0,
    discount_code: '',
    discount_start_date: new Date(),
    discount_end_date: new Date(),
    discount_max_uses: 10,
    discount_max_uses_per_user: 1,
    discount_min_order_value: 100000,
    discount_shop_id: shop?.metadata.shop._id,
    discount_is_active: true,
    discount_applies_to: 'specific',
    discount_product_ids: [],
    discount_uses_count: 0,
  };
  const [formData, setFormData] = useState(initialState);

  // Save data of form to Local Storage when formData is changing
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Restore data from form in Local Storage when component is being created
  useEffect(() => {
    if (isEdit) {
      setFormData(editDiscount);
    } else {
      const savedFormData = JSON.parse(localStorage.getItem('formData'));
      if (savedFormData) {
        setFormData(savedFormData);
      }
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getApplyProduct = (products) => {
    if (formData.discount_applies_to === 'specific') {
      if (isEdit) {
        const editFormData = JSON.parse(localStorage.getItem('formData'));
        setFormData(editFormData);
      }
      products.forEach((product) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          discount_product_ids: [...prevFormData.discount_product_ids, product.id],
        }));
        setApplyProduct((prev) => [
          ...prev,
          { name: product.name, id: product.id, slug: product.slug, type: product.type, shop: product.shop },
        ]);
      });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>{isEdit ? 'Edit discount' : 'Create new discount'}</h1>
      <Form onSubmitCapture={(e) => e.preventDefault()} className={cx('form')}>
        <Row>
          <Col md={5}>
            <Form.Group className={cx('form-group')} controlId="discount_type">
              <Form.Label className={cx('form-label')}>Category</Form.Label>
              <Form.Control
                className={cx('form-control')}
                as="select"
                name="discount_type"
                value={discountType}
                onChange={handleDiscountType}
              >
                <option value="">Select discount type</option>
                <option value="fixed_amount">Fixed amount</option>
                <option value="percentage">Percentage</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_name">
              <Form.Label className={cx('form-label')}>Name</Form.Label>
              <Form.Control
                ref={nameRef}
                value={formData.discount_name}
                className={cx('form-control')}
                type="text"
                name="discount_name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_description">
              <Form.Label className={cx('form-label')}>Description</Form.Label>
              <Form.Control
                value={formData.discount_description}
                className={cx('form-control')}
                as="textarea"
                rows={3}
                name="discount_description"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_value">
              <Form.Label className={cx('form-label')}>Value</Form.Label>
              <Form.Control
                value={formData.discount_value}
                className={cx('form-control')}
                type="text"
                name="discount_value"
                onChange={handleInputChange}
                placeholder={discountType === 'fixed_amount' ? 'Example: 100000' : 'Example: 20'}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_max_value">
              <Form.Label className={cx('form-label')}>Max value</Form.Label>
              <Form.Control
                value={formData.discount_max_value}
                className={cx('form-control')}
                type="text"
                name="discount_max_value"
                onChange={handleInputChange}
                placeholder={discountType === 'fixed_amount' ? 'Example: 100000' : 'Example: 20'}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_code">
              <Form.Label className={cx('form-label')}>Code</Form.Label>
              <Form.Control
                value={formData.discount_code}
                className={cx('form-control')}
                type="text"
                name="discount_code"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className={cx('form-group')} controlId="discount_start_date">
              <Form.Label className={cx('form-label')}>Start at</Form.Label>
              <Form.Control
                value={formData.discount_start_date}
                className={cx('form-control')}
                type="date"
                name="discount_start_date"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_end_date">
              <Form.Label className={cx('form-label')}>Expire at</Form.Label>
              <Form.Control
                value={formData.discount_end_date}
                className={cx('form-control')}
                type="date"
                name="discount_end_date"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_max_uses">
              <Form.Label className={cx('form-label')}>Max uses</Form.Label>
              <Form.Control
                value={formData.discount_max_uses}
                className={cx('form-control')}
                type="text"
                name="discount_max_uses"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_max_uses_per_user">
              <Form.Label className={cx('form-label')}>Max uses per user</Form.Label>
              <Form.Control
                value={formData.discount_max_uses_per_user}
                className={cx('form-control')}
                type="text"
                name="discount_max_uses_per_user"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_min_order_value">
              <Form.Label className={cx('form-label')}>Min order value</Form.Label>
              <Form.Control
                value={formData.discount_min_order_value}
                className={cx('form-control')}
                type="text"
                name="discount_min_order_value"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={cx('form-group')} controlId="discount_applies_to">
              <Form.Label className={cx('form-label')}>Apply to</Form.Label>
              <Form.Control
                className={cx('form-control')}
                value={formData.discount_applies_to}
                as="select"
                name="discount_applies_to"
                onChange={(e) => {
                  handleApplyTo(e);
                  handleInputChange(e);
                }}
              >
                <option value="">Select apply to</option>
                <option value="all">All</option>
                <option value="specific">Specific</option>
              </Form.Control>
            </Form.Group>
            {applyTo === 'specific' && (
              <Form.Group className={cx('form-group', 'apply')} controlId="discount_product_ids">
                <ProductModal isEdit={isEdit} onDataChange={getApplyProduct} text="Choose products"></ProductModal>
                <Form.Label className={cx('form-label')}>Select products</Form.Label>
                {applyProduct.map((product, index) => (
                  <div onClick={() => handleProductDetail(product.id, product.shop, product.type)}>
                    <Link key={index} to={`/product/${product.slug}`}>
                      <li>{product.name}</li>
                    </Link>
                  </div>
                ))}
              </Form.Group>
            )}
          </Col>
          <Col className={cx('submit-col')} md={2}>
            <Button className={cx('submit-btn')} primary onClick={handleSubmit}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ShopCreateDiscount;
