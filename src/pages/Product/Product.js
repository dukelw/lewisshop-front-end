import { useDispatch } from 'react-redux';
import { getAllProduct } from '~/redux/apiRequest';
import ProductContainer from '~/components/ProductContainer';

function Product() {
  const dispatch = useDispatch();

  const handleLoadAllProducts = (page, sort) => {
    getAllProduct(page, sort, dispatch);
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <ProductContainer getProductsFunction={handleLoadAllProducts} part={'All Products'}></ProductContainer>
    </div>
  );
}

export default Product;
