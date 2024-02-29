import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '~/redux/apiRequest';
import ProductContainer from '~/components/ProductContainer';

function Home() {
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
        part={'Recommended For You'}
      ></ProductContainer>
    </div>
  );
}

export default Home;
