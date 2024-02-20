import React from 'react';
import QRCode from 'qrcode.react';
import classNames from 'classnames/bind';
import styles from './QRCode.module.scss';

const cx = classNames.bind(styles);

class QRCodeGenerator extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <div className={cx('container')}>
        <QRCode value={url} size={200} fgColor="#000" bgColor="#fff" className={cx('qr')} />
      </div>
    );
  }
}

export default QRCodeGenerator;
