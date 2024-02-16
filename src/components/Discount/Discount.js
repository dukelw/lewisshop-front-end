import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Discount.module.scss';
import Button from '../Button';
import DiscountInfoModal from '../DiscountInfoModal';
import DiscountEditModal from '../DiscountEditModal';
import {
  DongIcon,
  LayerGroupIcon,
  MoneyBillIcon,
  PercentIcon,
  PlusIcon,
  TrashCanIcon,
  BarCodeIcon,
  LandMineOnIcon,
  EyeIcon,
  SquareMinusIcon,
} from '../Icons';
import { createAxios } from '~/createAxios';
import { findProductsByID, getDeletedDiscounts, getDiscountsOfShopByUser } from '~/redux/apiRequest';
import DeleteConfirm from '../DeleteConfirm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    console.log('Clicked discount: ' + discount);
    findProductsByID(discount.discount_product_ids, dispatch, axios);
  };

  const handleGoToAdd = () => {
    navigate('/shop/create/discount');
  };

  const handleGoToTrash = () => {
    navigate('/shop/restore/discount');
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
        <Button onClick={handleGoToAdd} className={cx('fixed-btn')} rounded outline>
          <PlusIcon className={cx('fixed-icon')}></PlusIcon>
        </Button>
        <Button onClick={handleGoToTrash} className={cx('fixed-btn')} rounded outline>
          <TrashCanIcon className={cx('fixed-icon')}></TrashCanIcon>
          <span className={cx('quantity')}>{deletedDiscounts.length}</span>
        </Button>
      </div>
      <p className={cx('part')}>
        {discounts.length > 0 ? (
          'All Voucher'
        ) : (
          <div>
            You do not have any voucher!
            <br />
            <Link className={cx('redirect')} to={'/shop/create/discount'}>
              Create your voucher?
            </Link>
          </div>
        )}
      </p>
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
                {!deleteMode ? (
                  <DiscountInfoModal data={discount} onDetailClick={handleDetailClick}>
                    <Button outline rounded>
                      Detail
                    </Button>
                  </DiscountInfoModal>
                ) : (
                  <DeleteConfirm discount_code={discount.discount_code}>
                    <Button outline rounded>
                      Delete
                    </Button>
                  </DeleteConfirm>
                )}

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
