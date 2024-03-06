import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/createAxios';
import styles from './Card.module.scss';
import EditModal from '../EditModal';
import { updateUserAddressDefault } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function Card() {
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const userInfo = useSelector((state) => state?.authUser.findUser?.foundUser);
  const userAddresses = userInfo?.metadata.user.all_addresses;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser);
  const navigate = useNavigate();
  const handleDefault = (index) => {
    updateUserAddressDefault(accessToken, userID, { index }, dispatch, axiosJWT);
  };

  return (
    <Container onClick={() => {}}>
      {userAddresses?.map((address, index) => (
        <Row className={cx('wrapper')} key={index}>
          <Col md={9}>
            <p className={cx('name')}>
              {address.name} <span className={cx('description')}>{address.phone} </span>
              {address.default ? <span className={cx('tab', 'active')}>Default</span> : ''}
            </p>
            <p className={cx('description')}>{address.address}</p>
            <p className={cx('description')}>{address.note}</p>
          </Col>
          <Col md={1}></Col>
          <Col md={2}>
            <div className={cx('actions')}>
              <EditModal data={address} index={index}>
                <div className={cx('btn-thumb')} onClick={() => {}}>
                  <p>Update</p>
                </div>
              </EditModal>
              <div className={cx('btn-thumb')} onClick={() => handleDefault(index)}>
                <p>Set as default</p>
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default Card;
