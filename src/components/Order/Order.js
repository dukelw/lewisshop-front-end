import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import Button from '../Button';
import { ProductHuntIcon, PercentIcon, LandMineOnIcon, CreditCardIcon, AddressBookIcon } from '../Icons';
import { createAxios } from '~/createAxios';
import { getOrdersByShop, updateOrderStatus, findUser } from '~/redux/apiRequest';
import DeleteConfirm from '../DeleteConfirm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrderInfoModal from '../OrderInfoModal';

const cx = classNames.bind(styles);

function Discount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const currentOrders = useSelector((state) => state?.order.findOrder.foundOrder);
  const orders = currentOrders?.metadata || [];
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const axiosJWT = createAxios(currentShop);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleDetailClick = (order) => {
    // Call findProducts with the order's product IDs
    findUser(accessToken, shopID, order.order_user_id, dispatch, axios);
  };

  const handleProductDetail = (productID, shopID, productType) => {
    localStorage.setItem('productDetailID', productID);
    localStorage.setItem('productShopID', shopID);
    localStorage.setItem('productType', productType);
  };

  const handleGoToAdd = () => {
    navigate('/shop/create/order');
  };

  const handleGoToTrash = () => {
    navigate('/shop/restore/order');
  };

  const handleConfirm = (orderID) => {
    updateOrderStatus(accessToken, shopID, orderID, 'confirm', dispatch, axiosJWT);
  };

  useEffect(() => {
    getOrdersByShop(accessToken, shopID, 'pending', dispatch, axiosJWT);
  }, []);

  return (
    <Container className={cx('wrapper')}>
      {/* <div className={cx('fixed')}>
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
      </div> */}
      <p className={cx('part')}>{orders.length > 0 ? 'All Orders' : <div>You do not have any order!</div>}</p>
      <Row>
        {orders.map((order, index) => (
          <Col style={{ margin: '7px 0px' }} md={3} key={index} onClick={() => {}}>
            <Card className={cx('card')}>
              <Card.Img
                className={cx('image')}
                variant="top"
                src="https://seotrends.com.vn/wp-content/uploads/2023/06/anh-sale-doc-dao.jpg"
              />
              <Card.Body className={cx('inner')}>
                <Card.Title className={cx('header')}>
                  Order {moment(order.createdAt).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')}
                </Card.Title>
                <div className={cx('group')}>
                  <p className={cx('title')}>
                    <LandMineOnIcon />
                    Status
                  </p>
                  <p className={cx('text')}>
                    <span className={cx('active')}>{order.order_status}</span>
                  </p>
                </div>
                <div className={cx('group')}>
                  <p className={cx('title')}>
                    <CreditCardIcon /> Payment
                  </p>
                  <p className={cx('text')}>
                    {order.order_type === 'percentage' ? <PercentIcon className={cx('type')} /> : order.order_payment}
                  </p>
                </div>
                <div className={cx('group')}>
                  <p className={cx('title')}>
                    <AddressBookIcon />
                    Address
                  </p>
                  <p className={cx('text', 'text-limit')}>{order.order_shipping}</p>
                </div>
                <div className={cx('group', 'products-group')}>
                  <p className={cx('title')}>
                    <ProductHuntIcon />
                    Product
                  </p>
                  <div className={cx('products')}>
                    {order.order_products[0].item_products.map((product, index) => (
                      <div
                        className={cx('redirect')}
                        key={index}
                        onClick={() => handleProductDetail(product.product_id, shopID, product.type)}
                      >
                        <Link className={cx('link')} key={index} to={`/product/${product.slug}`}>
                          <li>{product.name}</li>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <Card.Text className={cx('description')}>{order.order_description}</Card.Text>
              </Card.Body>
              <Card.Footer className={cx('footer')}>
                {!deleteMode ? (
                  <OrderInfoModal
                    data={order}
                    code={order.order_products[0].shop_discounts}
                    onDetailClick={handleDetailClick}
                  >
                    <Button outline rounded>
                      Detail
                    </Button>
                  </OrderInfoModal>
                ) : (
                  <DeleteConfirm order_code={order.order_code}>
                    <Button outline rounded>
                      Delete
                    </Button>
                  </DeleteConfirm>
                )}

                <Button onClick={() => handleConfirm(order._id)} outline rounded>
                  Confirm
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
