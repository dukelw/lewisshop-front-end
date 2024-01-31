import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '~/redux/apiRequest';
import ProductContainer from '~/components/ProductContainer';

function Home() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];

  useEffect(() => {
    getAllProduct(dispatch);
  }, []);

  return (
    <div style={{ marginTop: '80px' }}>
      <ProductContainer data={data} part={'Recommended For You'}></ProductContainer>
    </div>
  );
}

export default Home;
