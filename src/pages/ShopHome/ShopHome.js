import ShopProductContainer from '~/components/ShopProductContainer';
import { createAxios } from '~/createAxios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductOfShop } from '~/redux/apiRequest';

function ShopHome() {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];
  const axiosJWT = createAxios(shop);

  useEffect(() => {
    if (shop) {
      getAllProductOfShop(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, dispatch, axiosJWT);
    }
  }, []);

  return (
    <div style={{ marginTop: '80px' }}>
      <ShopProductContainer
        products={data}
        axiosJWT={axiosJWT}
        part={'All Products'}
        publishEnable={false}
      ></ShopProductContainer>
    </div>
  );
}

export default ShopHome;
