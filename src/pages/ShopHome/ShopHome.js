// import ShopProductContainer from '~/components/ShopProductContainer';
// import { getAllPublishOfShop } from '~/redux/apiRequest';
// import { createAxios } from '~/createAxios';
import ShopPublished from '../ShopPublished';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

function ShopHome() {
  // const dispatch = useDispatch();
  // const product = useSelector((state) => state.products.products.allProducts);
  // const data = product?.metadata || [];
  // const axiosJWT = createAxios(shop);

  return <div style={{ marginTop: '80px' }}>{<ShopPublished></ShopPublished>}</div>;
}

export default ShopHome;
