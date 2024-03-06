import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/createAxios';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card() {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const addToCart = useSelector((state) => state.authUser.addToCart.addedProduct);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const navigate = useNavigate();

  return (
    <Container onClick={() => {}}>
      <Row>
        <Link to={``} className={cx('wrapper')}>
          <Col md={2}>
            <div
              className={cx('image')}
              style={{
                backgroundImage: `url('https://static.topcv.vn/company_logos/4A2q2MQDiIntg4eNYpkBtMfvWBvzl8sI_1647500651____d16aec8bd09abe0549ea2ada86c98763.png')`,
              }}
            ></div>
          </Col>
          <Col md={6}>
            <p className={cx('name')}>
              MB Bank - NHTMCP QUAN DOI <span className={cx('tab')}>Verified</span>
              <span className={cx('tab', 'active')}>Default</span>
            </p>
            <p className={cx('description')}>Name: LE PHAN THE VI</p>
            <p className={cx('description')}>Branch: An Giang, Cho Moi</p>
          </Col>
          <Col className={cx('actions')} md={2}>
            <div className={cx('btn-thumb')} onClick={(e) => {}}>
              <p>Delete</p>
            </div>
          </Col>
          <Col className={cx('actions')} md={2}>
            <div className={cx('btn-thumb')} onClick={(e) => {}}>
              <p>Set as default</p>
            </div>
          </Col>
        </Link>
      </Row>
      <Row>
        <Link to={``} className={cx('wrapper')}>
          <Col md={2}>
            <div
              className={cx('image')}
              style={{
                backgroundImage: `url('https://static.topcv.vn/company_logos/4A2q2MQDiIntg4eNYpkBtMfvWBvzl8sI_1647500651____d16aec8bd09abe0549ea2ada86c98763.png')`,
              }}
            ></div>
          </Col>
          <Col md={6}>
            <p className={cx('name')}>
              MB Bank - NHTMCP QUAN DOI <span className={cx('tab')}>Verified</span>
              <span className={cx('tab', 'active')}>Default</span>
            </p>
            <p className={cx('description')}>Name: LE PHAN THE VI</p>
            <p className={cx('description')}>Branch: An Giang, Cho Moi</p>
          </Col>
          <Col className={cx('actions')} md={2}>
            <div className={cx('btn-thumb')} onClick={(e) => {}}>
              <p>Delete</p>
            </div>
          </Col>
          <Col className={cx('actions')} md={2}>
            <div className={cx('btn-thumb')} onClick={(e) => {}}>
              <p>Set as default</p>
            </div>
          </Col>
        </Link>
      </Row>
    </Container>
  );
}

export default Card;
