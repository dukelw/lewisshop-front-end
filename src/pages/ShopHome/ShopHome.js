import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopProductContainer from '~/components/ShopProductContainer';
import { getAllPublishOfShop } from '~/redux/apiRequest';

function ShopHome() {
  const shop = useSelector((state) => state.authShop.signin?.currentShop);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];
  const axiosJWT = axios.create();
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

  const refreshToken = async () => {
    let rToken = localStorage.getItem('refreshToken');
    try {
      const res = await axios.post(
        `${REACT_APP_BASE_URL}shop/refresh-token`,
        {},
        {
          headers: {
            user: shop?.metadata.shop._id,
            token: rToken,
          },
        },
      );
      localStorage.setItem('refreshToken', res.data.metadata.tokens.refreshToken);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(shop?.metadata.tokens.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        config.headers['token'] = data.metadata.tokens.refreshToken;
        config.headers['authorization'] = data.metadata.tokens.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    if (shop) {
      getAllPublishOfShop(shop?.metadata.tokens.accessToken, shop?.metadata.shop._id, dispatch, axiosJWT);
    }
  }, []);
  return <ShopProductContainer axiosJWT={axiosJWT} products={data}></ShopProductContainer>;
}

export default ShopHome;
