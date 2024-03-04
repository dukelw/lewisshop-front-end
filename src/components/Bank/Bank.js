import className from 'classnames/bind';
import styles from './Bank.module.scss';
import { Container, Row } from 'react-bootstrap';

const cx = className.bind(styles);

function Bank() {
  return (
    <Container>
      <Row>
        <h1>Bank</h1>
      </Row>
    </Container>
  );
}

export default Bank;
