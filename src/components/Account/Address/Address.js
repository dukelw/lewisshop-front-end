import className from 'classnames/bind';
import styles from './Address.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../../Button';
import Card from './Card';
import AddModal from './AddModal';

const cx = className.bind(styles);

function Address() {
  return (
    <Container className={cx('wrapper')}>
      <Row>
        <Col md={12}>
          <div className={cx('top')}>
            <h2 className={cx('header')}>My address</h2>
            <AddModal>
              <Button primary>Add new address</Button>
            </AddModal>
          </div>
          <div className={cx('bottom')}>
            <Card />
            {/* <span className={cx('empty')}>You have not linked to your card</span> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Address;
