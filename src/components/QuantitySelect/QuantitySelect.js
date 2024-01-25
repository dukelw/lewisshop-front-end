import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './QuantitySelect.module.scss';
import { AddIcon, SubtractIcon } from '../Icons';

const cx = classNames.bind(styles);

function QuantitySelect({ className, large }) {
  const [quantity, setQuantity] = useState(1);

  const classNames = { large, [className]: className };
  return (
    <div
      className={cx('wrapper', {
        ...classNames,
      })}
    >
      <SubtractIcon className={cx('icon')} onClick={(e) => setQuantity((prev) => prev - 1)}></SubtractIcon>
      <p className={cx('quantity')}>{quantity}</p>
      <AddIcon className={cx('icon')} onClick={(e) => setQuantity((pre) => pre + 1)}></AddIcon>
    </div>
  );
}

export default QuantitySelect;
