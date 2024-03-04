import className from 'classnames/bind';
import styles from './Bank.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../../Button';
import Card from './Card';

const cx = className.bind(styles);

function Bank() {
  return (
    <Container className={cx('wrapper')}>
      <Row>
        <Col md={12}>
          <div className={cx('top')}>
            <h2 className={cx('header')}>Credit/Debit Card</h2>
            <Button primary>Add your card</Button>
          </div>
          <div className={cx('bottom')}>
            <span className={cx('empty')}>You have not linked to your card</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className={cx('top')}>
            <h2 className={cx('header')}>Credit/Debit Card</h2>
            <Button primary>Add your card</Button>
          </div>
          <div className={cx('bottom')}>
            {/* <span className={cx('empty')}>You have not linked to your card</span> */}
            <Card />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Bank;
