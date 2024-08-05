import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductVariance from '~/components/ProductVariance';
import { createAxios } from '~/createAxios';
import { getAllProductOfShop } from '~/redux/apiRequest';

function ShopVariance() {
  const dispatch = useDispatch();
  const currentShop = useSelector((state) => state?.authShop.signin?.currentShop);
  const accessToken = currentShop?.metadata.tokens.accessToken;
  const shopID = currentShop?.metadata.shop._id;
  const axiosJWT = createAxios(currentShop);
  const getShopProducts = () => {
    getAllProductOfShop(accessToken, shopID, dispatch, axiosJWT);
  };
  return <ProductVariance part={'Products'} getProductsFunction={getShopProducts} isShopView={true} />;
}

export default ShopVariance;
