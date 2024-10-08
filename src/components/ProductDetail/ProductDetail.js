import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import styles from './ProductDetail.module.scss';
import { addToFavouriteList, addToast, findCommentOfProduct, getAllVariantsOfProduct } from '~/redux/apiRequest';
import Button from '../Button';
import { SubtractIcon, AddIcon } from '../Icons';
import { FavouriteIcon } from '../Icons';
import { addProductToCart } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import axios from 'axios';
import CommentList from '../CommentList';
import { findProductByID, findRelateProduct, findShopByID, getUpdatedCart } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductDetail() {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const addToCart = useSelector((state) => state.authUser.addToCart.addedProduct);
  const variants = useSelector((state) => state?.variant.get?.allVariants)?.metadata;
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user?._id;
  const productID = localStorage.getItem('productDetailID');
  const shopID = localStorage.getItem('productShopID');
  const productType = localStorage.getItem('productType');
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => state?.products.product.foundProduct);
  const relate = useSelector((state) => state?.products.relateProduct.relatedProducts);
  const currentComment = useSelector((state) => state?.comment.find.foundComment);
  const comments = currentComment?.metadata;
  const originalRecentProducts = useSelector((state) => state?.products.recentProduct.recentProducts);
  const relatedProducts = relate?.metadata;
  const productShop = useSelector((state) => state?.shop.shop.foundShop);
  const shop = productShop?.metadata;
  const product = currentProduct?.metadata;
  const axiosJWT = createAxios(currentUser);
  const navigate = useNavigate();
  const [display, setDisplay] = useState('detail');
  const [size, setSize] = useState('');
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedVariance, setSelectedVariance] = useState('');

  const recentProducts = originalRecentProducts.filter(
    (value, index, self) => index === self.findIndex((t) => t.metadata?._id === value.metadata?._id),
  );

  function stringToSlug(str) {
    str = str?.toLowerCase()?.trim();
    str = str?.replace(/\s+/g, '-');
    str = str?.replace(/[^\w\-]+/g, '');
    return str;
  }

  const [quantity, setQuantity] = useState(1);

  const handleUp = (e) => {
    setQuantity((pre) => pre + 1);
  };

  const handleDown = (e) => {
    setQuantity((pre) => pre - 1);
  };

  let toast = { message: '', type: 'success', show: true };
  const handleAddToCart = async (event, productID, shopID) => {
    event.preventDefault();
    if (!currentUser) {
      toast.message = 'Please sign in first!';
      toast.type = 'warning';
      addToast(toast, dispatch);
      setTimeout(() => {
        navigate('/user/signin');
      }, 1500);
    } else {
      const products = {
        user_id: userID,
        product: {
          product_id: productID,
          shop_id: shopID,
          quantity,
        },
      };
      await addProductToCart(accessToken, userID, products, dispatch, axiosJWT);
      getUpdatedCart(accessToken, userID, dispatch, axiosJWT);
      if (addToCart?.statusCode === 200) {
        toast.message = addToCart.message;
      } else if (!addToCart?.statusCode) {
        toast.message = 'Add product to cart successfully';
      } else {
        toast.message = 'There is an error when adding to cart. Please try again';
        toast.type = 'error';
      }
      addToast(toast, dispatch);
    }
  };

  const { product_slug } = useParams();

  useEffect(() => {
    // Use axios because this function can be used even if user has not signed in
    findProductByID(productID, dispatch, axios);
    findRelateProduct(productType, dispatch, axios);
    findCommentOfProduct(productID, 1, dispatch, axios);
    getAllVariantsOfProduct(productID, dispatch);
  }, [product_slug]);

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
  }, [product_slug]);

  useEffect(() => {
    findShopByID(shopID, dispatch, axios);
  }, []);

  const handleAddToFavouriteList = () => {
    addToFavouriteList(accessToken, userID, product, dispatch, axiosJWT);
  };

  useEffect(() => {
    if (size) {
      const availableColors = variants
        .filter((variant) => variant.variant_size === size)
        ?.map((variant) => ({ value: variant.variant_color, label: variant.variant_color }));
      setColors(availableColors);
    } else {
      setColors([]);
    }
  }, [size]);

  const handleSizeChange = (selectedOption) => {
    setSize(selectedOption?.value || '');
    setSelectedColor('');
    updateVariantImage(selectedOption?.value, selectedColor);
  };

  const handleColorChange = (selectedOption) => {
    setSelectedColor(selectedOption?.value || '');
    updateVariantImage(size, selectedOption?.value);
  };

  const updateVariantImage = (s, c) => {
    variants?.map((variant) => {
      if (variant.variant_color === c && variant.variant_size === s) {
        setSelectedVariance(variant.variant_image);
        return true;
      }
      return false;
    });
  };

  const sizeOptions = [...new Set(variants?.map((variant) => variant.variant_size))]?.map((size) => ({
    value: size,
    label: size,
  }));

  return (
    <div className={cx('wrapper')}>
      {/* Product section */}
      <div className={cx('product')}>
        <div className={cx('left')}>
          <div
            className={cx('img')}
            style={{ backgroundImage: `url(${selectedVariance === '' ? product?.product_thumb : selectedVariance})` }}
          ></div>
          <div className={cx('variance_display')}>
            {variants?.map((variant, index) => {
              if (index < 5) {
                return <img className={cx('variant_image')} src={variant?.variant_image} alt="Variant" key={index} />;
              } else {
                return <p className={cx('triple-dot')}>...</p>;
              }
            })}
          </div>
        </div>
        <div className={cx('right')}>
          <h2 className={cx('name')}>{product?.product_name}</h2>
          <h3 className={cx('price')}>{product?.product_price}</h3>
          <p className={cx('description')}>{product?.product_description}</p>

          <div className={cx('variance')}>
            <div className={cx('variant_wrapper')}>
              <label className={cx('variant_label')}>Size</label>
              <Select
                options={sizeOptions}
                onChange={handleSizeChange}
                value={sizeOptions.find((option) => option.value === size)}
                placeholder="Select Size"
              />
            </div>
            <div className={cx('variant_wrapper')}>
              <label className={cx('variant_label')}>Color</label>
              <Select
                options={colors}
                onChange={handleColorChange}
                value={colors.find((option) => option.value === selectedColor)}
                placeholder="Select Color"
                isDisabled={!size}
              />
            </div>
          </div>

          <div className={cx('actions')}>
            <div className={cx('product_quantity')}>
              <SubtractIcon className={cx('icon')} onClick={(e) => handleDown(e)}></SubtractIcon>
              <p className={cx('quantity')}>{quantity}</p>
              <AddIcon className={cx('icon')} onClick={(e) => handleUp(e)}></AddIcon>
            </div>
            <Button
              onClick={(e) => handleAddToCart(e, productID, shopID)}
              className={cx('action', 'add')}
              large
              primary
            >
              Add to cart
            </Button>
            <Button onClick={handleAddToFavouriteList} className={cx('action', 'favourite')} square outline>
              <FavouriteIcon />
            </Button>
          </div>

          <ul className={cx('assurance')}>
            {product?.product_attributes &&
              Object.entries(product?.product_attributes)?.map(([key, value]) => (
                <li className={cx('square')} key={key}>
                  <span>{key.toUpperCase()}: </span>
                  <span>{value}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div
        onClick={() => {
          localStorage.setItem('shopID', shop?._id);
        }}
      >
        <Link to={'/shop/' + stringToSlug(shop?.name)}>
          <div className={cx('shop')}>
            <div className={cx('invite')}>
              <h1 className={cx('description')}>"{shop?.description}"</h1>
              <span>Go to the shop for more products</span>
            </div>
            <div className={cx('shop-avt')} style={{ backgroundImage: `url('${shop?.thumb}')` }}></div>
            <div className={cx('shop-info')}>
              <p className={cx('shop-name')}>{shop?.name}</p>
              <p className={cx('shop-status')}>{shop?.status}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className={cx('section')}>
        <p className={cx('detail', 'text')} onClick={(e) => setDisplay('detail')}>
          Detail
        </p>
        <p className={cx('comment', 'text')} onClick={(e) => setDisplay('comment')}>
          Comment
        </p>
      </div>
      <div className={cx('render')}>
        <CommentList comments={comments} product_id={productID} />{' '}
      </div>
      <div className={cx('relate')}>
        <p className={cx('title')}>Relate Products</p>
        <Container>
          <Row>
            {relatedProducts &&
              relatedProducts?.map((item, index) => {
                return (
                  <Col key={index} sm={6} xl={2} lg={2}>
                    <ProductCard data={item}></ProductCard>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
      <div className={cx('recent')}>
        <p className={cx('title')}>Recently Viewed Products</p>
        <Container>
          <Row>
            {recentProducts &&
              recentProducts?.map((item, index) => {
                return (
                  <Col key={index} sm={6} xl={2} lg={2}>
                    <ProductCard data={item?.metadata}></ProductCard>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ProductDetail;
