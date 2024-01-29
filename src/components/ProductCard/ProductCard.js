import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import StarRating from '../HeartRating';
import { DongIcon } from '../Icons';

const cx = classNames.bind(styles);

function ProductCard({ data }) {
  const handleThumbClick = (event) => {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Handle your thumb click logic here
    // console.log('Thumb clicked!');
  };

  return (
    <Link to={`/detail/${data._id}`} className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('image')} style={{ backgroundImage: `url(${data.product_thumb})` }}></div>
        <div className={cx('text')}>
          <div className={cx('detail')}>
            <div className={cx('left')}>
              <p className={cx('name')}>{data.product_name}</p>
            </div>
            <div className={cx('right')}>
              <div className={cx('btn-thumb')} onClick={handleThumbClick}>
                <p>+</p>
              </div>
            </div>
          </div>
          <p className={cx('description')}>{data.product_description}</p>
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
    </Link>
  );
}

export default ProductCard;
