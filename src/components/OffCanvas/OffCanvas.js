import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import classNames from 'classnames/bind';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './OffCanvas.module.scss';
import { ListIcon } from '../Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function OffCanvas({ Icon = ListIcon, content = 'All', className }) {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const classNames = cx('button', {
    [className]: className,
  });

  const handleClickItem = (index) => {
    setSelectedItem(index);
    handleClose();
  };

  const SHOP_LIST_ITEMS = [
    {
      title: 'Home',
      to: '/shop',
    },
    {
      title: 'All orders',
      to: '/shop/orders',
    },
    {
      title: 'Add new products',
      to: '/shop/create/product',
    },
    {
      title: 'Add new product variants',
      to: '/shop/create/product-variants',
    },
    {
      title: 'All draft products',
      to: '/shop/draft',
    },
    {
      title: 'All published products',
      to: '/shop/published',
    },
    {
      title: 'Add new discounts',
      to: '/shop/create/discount',
    },
    {
      title: 'All discounts',
      to: '/discounts',
    },
  ];

  return (
    <>
      <Button className={classNames} onClick={handleShow}>
        <Icon className={cx('icon')}></Icon>
        {content}
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={cx('title')}>All</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush" defaultActiveKey={selectedItem}>
            {SHOP_LIST_ITEMS.map((item, index) => (
              <Link key={index} to={item.to}>
                <ListGroup.Item
                  action
                  onClick={() => handleClickItem(index)}
                  className={cx('item', { active: selectedItem === index })}
                  style={{ backgroundColor: selectedItem === index ? '#ff3d47' : 'unset', border: 'unset' }}
                >
                  {item.title}
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
