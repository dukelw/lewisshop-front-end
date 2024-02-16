import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '~/redux/apiRequest';
import ProductContainer from '~/components/ProductContainer';

function Product() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];

  useEffect(() => {
    getAllProduct(dispatch);
  }, []);

  return (
    <div style={{ marginTop: '80px' }}>
      <ProductContainer data={data} part={'All Products'}></ProductContainer>
    </div>
  );
}

export default Product;
