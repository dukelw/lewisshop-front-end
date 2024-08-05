import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '~/components/ProductDetail';
// eslint-disable-next-line

function ProductDetailContainer() {
  const { productID } = useParams(); // Lấy giá trị của tham số từ URL
  // const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết sản phẩm dựa vào productID
    // Update state productDetail khi có dữ liệu từ API
  }, [productID]);

  return <ProductDetail product={[]} recentProducts={[]} relatedProducts={[]}></ProductDetail>;
}

export default ProductDetailContainer;
