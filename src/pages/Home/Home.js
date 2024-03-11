import { useDispatch } from 'react-redux';
import { getAllProduct } from '~/redux/apiRequest';
import ProductContainer from '~/components/ProductContainer';

function Home() {
  const dispatch = useDispatch();

  const handleLoadAllProducts = (page) => {
    getAllProduct(page, dispatch);
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <ProductContainer getProductsFunction={handleLoadAllProducts} part={'Recommended For You'}></ProductContainer>
    </div>
  );
}

export default Home;
