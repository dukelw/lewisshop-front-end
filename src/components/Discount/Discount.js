import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Discount.module.scss';
import { BarCodeIcon, LandMineOnIcon } from '../Icons';
import Button from '../Button';
import DiscountInfoModal from '../DiscountInfoModal';
import DiscountEditModal from '../DiscountEditModal';
import { DongIcon, LayerGroupIcon, MoneyBillIcon, PercentIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import { findProductsByID, getDiscountsOfShopByUser } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function Discount() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const currentDiscounts = useSelector((state) => state?.discount.discounts.foundDiscounts);
  const discounts = currentDiscounts?.metadata || [];
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const axiosJWT = createAxios(currentShop);

  const handleDetailClick = (discount) => {
    // Call findProducts with the discount's product IDs
    findProductsByID(discount.discount_product_ids, dispatch);
  };

  useEffect(() => {
    getDiscountsOfShopByUser(accessToken, shopID, shopID, dispatch, axiosJWT);
  }, []);

  return (
    <Container className={cx('wrapper')}>
      <Row>
        {discounts.map((discount, index) => (
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
                <DiscountInfoModal data={discount}>
                  <Button outline rounded onClick={() => handleDetailClick(discount)}>
                    Detail
                  </Button>
                </DiscountInfoModal>

                <DiscountEditModal data={discount}>
                  <Button outline rounded>
                    Edit
                  </Button>
                </DiscountEditModal>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Discount;
