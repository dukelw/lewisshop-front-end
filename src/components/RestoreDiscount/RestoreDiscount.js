import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './RestoreDiscount.module.scss';
import Button from '../Button';
import DiscountInfoModal from '../DiscountInfoModal';
import {
  DongIcon,
  LayerGroupIcon,
  MoneyBillIcon,
  PercentIcon,
  BarCodeIcon,
  LandMineOnIcon,
  EyeIcon,
  SquareMinusIcon,
} from '../Icons';
import { createAxios } from '~/createAxios';
import { getDeletedDiscounts, getDiscountsOfShopByUser, findProductsByID, restoreDiscount } from '~/redux/apiRequest';
import DeleteConfirm from '../DeleteConfirm';

const cx = classNames.bind(styles);

function Discount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const currentDiscounts = useSelector((state) => state?.discount.discounts.foundDiscounts);
  const discounts = currentDiscounts?.metadata || [];
  const currentDeletedDiscounts = useSelector((state) => state?.discount.deleted.deletedDiscounts);
  const deletedDiscounts = currentDeletedDiscounts?.metadata || [];
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const axiosJWT = createAxios(currentShop);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleDetailClick = (discount) => {
    // Call findProducts with the discount's product IDs
    findProductsByID(discount.discount_product_ids, dispatch, axios);
  };

  const handleGoToDiscount = () => {
    navigate('/discounts');
  };

  const handleRestore = (discountID) => {
    restoreDiscount(accessToken, shopID, discountID, dispatch, axiosJWT);
  };

  useEffect(() => {
    getDiscountsOfShopByUser(accessToken, shopID, shopID, dispatch, axiosJWT);
    getDeletedDiscounts(accessToken, shopID, dispatch, axiosJWT);
  }, []);

  return (
    <Container className={cx('wrapper')}>
      <div className={cx('fixed')}>
        <Button className={cx('fixed-btn')} onClick={(e) => setDeleteMode(!deleteMode)} rounded outline>
          {deleteMode ? <EyeIcon className={cx('fixed-icon')} /> : <SquareMinusIcon className={cx('fixed-icon')} />}
        </Button>
        <Button onClick={handleGoToDiscount} className={cx('fixed-btn')} rounded outline>
          <MoneyBillIcon className={cx('fixed-icon')}></MoneyBillIcon>
          <span className={cx('quantity')}>{discounts.length}</span>
        </Button>
      </div>
      <Row>
        <p className={cx('part')}>
          {deletedDiscounts.length > 0 ? (
            'All Deleted Voucher'
          ) : (
            <div>
              The dustbin is empty! See your{' '}
              <Link className={cx('redirect')} to={'/discounts'}>
                all voucher?
              </Link>
            </div>
          )}
        </p>
      </Row>
      <Row>
        {deletedDiscounts.map((discount, index) => (
          <Col style={{ margin: '7px 0px' }} md={3} key={index} onClick={() => {}}>
            <Card className={cx('card')}>
              <Card.Img
                className={cx('image')}
                variant="top"
                src="https://seotrends.com.vn/wp-content/uploads/2023/06/anh-sale-doc-dao.jpg"
              />
              <Card.Body className={cx('inner')}>
                <Card.Title className={cx('header')}>{discount.discount_name}</Card.Title>
                <div className={cx('group')}>
                  <p className={cx('title')}>
                    <LandMineOnIcon />
                    Status
                  </p>
                  <p className={cx('text')}>
                    {discount.discount_is_active ? (
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
                    {discount.discount_type === 'percentage' ? (
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
                  <p className={cx('text', 'text-limit')}>{discount.discount_code}</p>
                </div>
                <div className={cx('group')}>
                  <p className={cx('title')}>
                    <MoneyBillIcon />
                    Value
                  </p>
                  <p className={cx('text')}>
                    {discount.discount_value}
                    {discount.discount_type === 'percentage' ? (
                      <PercentIcon className={cx('type')} />
                    ) : (
                      <DongIcon className={cx('type')}></DongIcon>
                    )}
                  </p>
                </div>
                <Card.Text className={cx('description')}>{discount.discount_description}</Card.Text>
              </Card.Body>
              <Card.Footer className={cx('footer')}>
                {!deleteMode ? (
                  <DiscountInfoModal data={discount}>
                    <Button outline rounded onClick={handleDetailClick(discount)}>
                      Detail
                    </Button>
                  </DiscountInfoModal>
                ) : (
                  <DeleteConfirm discount_code={discount.discount_code} isDestroy={true} discount_id={discount._id}>
                    <Button outline rounded>
                      Delete
                    </Button>
                  </DeleteConfirm>
                )}

                <Button onClick={() => handleRestore(discount._id)} outline rounded>
                  Restore
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Discount;
