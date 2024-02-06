import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './QuantitySelect.module.scss';
import { AddIcon, SubtractIcon } from '../Icons';

const cx = classNames.bind(styles);

function QuantitySelect({ className, large, outline, initial, handleClickUpDown }) {
  const [quantity, setQuantity] = useState(initial ? initial : 1);

  const handleUp = (e) => {
    setQuantity((pre) => pre + 1);
    handleClickUpDown(1);
  };

  const handleDown = (e) => {
    setQuantity((pre) => pre - 1);
    handleClickUpDown(-1);
  };

  const classNames = cx('wrapper', {
    large,
    outline,
    [className]: className,
  });
  return (
    <div className={classNames}>
      <SubtractIcon className={cx('icon')} onClick={(e) => handleDown(e)}></SubtractIcon>
      <p className={cx('quantity')}>{quantity}</p>
      <AddIcon className={cx('icon')} onClick={(e) => handleUp(e)}></AddIcon>
    </div>
  );
}

export default QuantitySelect;
