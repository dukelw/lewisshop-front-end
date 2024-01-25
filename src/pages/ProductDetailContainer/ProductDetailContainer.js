import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '~/components/ProductDetail';

const RELATED_PRODUCT = [
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 2.5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 2,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 2,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
];

const RECENLY_VIEWED_PRODUCT = [
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 2.5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 2,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 2,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
  {
    _id: '123456789',
    img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
    name: 'Tủ lạnh siêu xịn',
    discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
    rating: 5,
    address: 'New York',
    old_price: 20000000,
    new_price: 18000000,
  },
];

const PRODUCT = {
  _id: '123456789',
  img: 'https://i.pinimg.com/736x/41/8f/91/418f9196728261aba357a2a2f28d3403.jpg',
  name: 'Tủ lạnh siêu xịn',
  discription: 'Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor incididunt ut lab',
  rating: 2.5,
  address: 'New York',
  old_price: 20000000,
  new_price: 18000000,
  description:
    'Lorem ipsum dolor sit amet, consectetur adip ex, sed do eiusmod tempor inc idunt ut lab et al lorem ipsum dolor sit amet lorem lorem et do lorem ipsum dolor sit amet, consectetur adip ex, sed do eiusmod tempor inc idunt ut lab et al lorem ipsum dolor sit amet lorem lorem et do lorem',
  shop_name: 'Lewis The duke',
  shop_status: 'Online 6 minutes ago',
  shop_img: 'https://i.pinimg.com/originals/cd/02/02/cd02020066c91b928d8ba4cdac1bd929.jpg',
  imgs: [
    'https://gamek.mediacdn.vn/133514250583805952/2023/3/16/base64-1678765068952545581271-1678935569178-16789355722821290402263-1678939693558-16789396938301654112024.png',
    'https://img-cdn.xemgame.com/2022/11/07/co-nang-makima-trong-chainsaw-man-lai-duoc-yeu-thich-den-vay-thumb.jpg',
    'https://www.geekmi.news/__export/1670365750140/sites/debate/img/2022/12/06/makima-chainsaw-man.jpg_1758632412.jpg',
    'https://img-cdn.xemgame.com/2022/11/07/co-nang-makima-trong-chainsaw-man-lai-duoc-yeu-thich-den-vay-thumb.jpg',
  ],
};

function ProductDetailContainer() {
  const { productID } = useParams(); // Lấy giá trị của tham số từ URL
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết sản phẩm dựa vào productID
    // Update state productDetail khi có dữ liệu từ API
  }, [productID]);

  // if (!productDetail) {
  //   return <p>Loading...</p>;
  // }

  return (
    <ProductDetail
      product={PRODUCT}
      recentProducts={RECENLY_VIEWED_PRODUCT}
      relatedProducts={RELATED_PRODUCT}
    ></ProductDetail>
  );
}

export default ProductDetailContainer;
