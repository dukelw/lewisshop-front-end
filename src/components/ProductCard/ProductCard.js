import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from '../HeartRating';
import { DongIcon } from '../Icons';
import { addProductToCart } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import { hideToast, showToast } from '~/redux/toastSlice';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

function ProductCard({ data }) {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const handleAddToCart = (event, productID, shopID) => {
    event.preventDefault();
    const products = {
      user_id: userID,
      product: {
        product_id: productID,
        shop_id: shopID,
        quantity: 1,
      },
    };
    addProductToCart(accessToken, userID, products, dispatch, axiosJWT);
    dispatch(showToast({ message: 'Add product to cart successfully', type: 'success', show: true }));
    setTimeout(() => {
      dispatch(hideToast());
    }, 2000);
  };

  return (
    <Link to={`/detail/${data._id}`} className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('image')} style={{ backgroundImage: `url(${data.product_thumb})` }}></div>
        <div className={cx('text')}>
          <div className={cx('top')}>
            <div className={cx('detail')}>
              <div className={cx('left')}>
                <p className={cx('name')}>{data.product_name}</p>
              </div>
              <div className={cx('right')}>
                <div className={cx('btn-thumb')} onClick={(e) => handleAddToCart(e, data._id, data.product_shop)}>
                  <p>+</p>
                </div>
              </div>
            </div>
            <p className={cx('description')}>{data.product_description}</p>
          </div>

          <div className={'bottom'}>
            <div className={cx('other-info')}>
              <div className={cx('rating')}>
                {<StarRating score={data.product_ratingAverage} color="ff3d47"></StarRating>}
              </div>
              <p className={cx('address')}>{data.address}</p>
            </div>
            <div className={cx('price')}>
              <p className={cx('new-price')}>
                <DongIcon padding="0" width="1.2rem" height="1.2rem"></DongIcon>
                {data.product_price}
              </p>
              <p className={cx('old-price')}>{data.product_price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
