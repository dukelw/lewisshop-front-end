import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopProductContainer from '~/components/ShopProductContainer';
import { getAllDraftsOfShop } from '~/redux/apiRequest';
import { createAxios } from '~/createAxios';

function ShopDraft() {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];
  const axiosJWT = createAxios(shop);

  useEffect(() => {
    if (shop) {
      getAllDraftsOfShop(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, dispatch, axiosJWT);
    }
  }, []);
  return (
    <ShopProductContainer
      axiosJWT={axiosJWT}
      products={data}
      part={'Draft Products'}
      publishEnable={true}
    ></ShopProductContainer>
  );
}

export default ShopDraft;
