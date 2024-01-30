import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopProductContainer from '~/components/ShopProductContainer';
import { getAllPublishOfShop } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

function ShopPublished() {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];
  const axiosJWT = createAxios(shop);

  useEffect(() => {
    if (shop) {
      getAllPublishOfShop(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, dispatch, axiosJWT);
    }
  }, []);
  return (
    <ShopProductContainer
      axiosJWT={axiosJWT}
      products={data}
      part={'Published Products'}
      publishEnable={false}
    ></ShopProductContainer>
  );
}

export default ShopPublished;
