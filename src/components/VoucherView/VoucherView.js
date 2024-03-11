import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import styles from './VoucherView.module.scss';
import Button from '../Button';
import { getDiscountsOfShopByUser, findProductsByID } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';
import DiscountInfoModal from '../DiscountInfoModal';
import { BarCodeIcon, DongIcon, MoneyBillIcon, PercentIcon, LandMineOnIcon, LayerGroupIcon } from '../Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Voucher() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.authUser.signin?.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const discounts = useSelector((state) => state?.discount.discounts?.foundDiscounts);
  const voucher = discounts?.metadata;
  const userID = currentUser?.metadata.user._id;
  const shopID = localStorage.getItem('shopID');
  const axiosJWT = createAxios(currentUser);
  const productShop = useSelector((state) => state?.shop.shop.foundShop);
  const shop = productShop?.metadata;

  const handleDetailClick = (discount) => {
    // Call findProducts with the discount's product IDs
    findProductsByID(discount.discount_product_ids, dispatch, axios);
  };

  useEffect(() => {
    getDiscountsOfShopByUser(accessToken, userID, shopID, dispatch, axios);
  }, []);

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('heading')}>Usable Voucher</h1>

      <div className={cx('shop')}>
        <Container>
          <Row>
            {voucher?.map((discount, index) => (
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
                    <DiscountInfoModal data={discount} onDetailClick={() => handleDetailClick(discount)}>
                      <Button outline rounded>
                        Detail
                      </Button>
                    </DiscountInfoModal>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Voucher;
