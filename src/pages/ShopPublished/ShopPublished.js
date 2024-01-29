import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopProductContainer from '~/components/ShopProductContainer';
import { getAllPublishOfShop } from '~/redux/apiRequest';

function ShopDraft() {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];

  useEffect(() => {
    if (shop) {
      getAllPublishOfShop(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, dispatch);
    }
  }, []);
  return <ShopProductContainer products={data}></ShopProductContainer>;
}

export default ShopDraft;
