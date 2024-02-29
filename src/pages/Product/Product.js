import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '~/redux/apiRequest';
import ProductContainer from '~/components/ProductContainer';

function Product() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products.allProducts);
  const data = product?.metadata || [];

  const [currentPage, setCurrentPage] = useState(1);

  const loadPaginations = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAllProduct(currentPage, dispatch);
  }, [currentPage]);

  return (
    <div style={{ marginTop: '80px' }}>
      <ProductContainer
        handlePageClick={loadPaginations}
        currentPage={currentPage}
        data={data}
        part={'All Products'}
      ></ProductContainer>
    </div>
  );
}

export default Product;
