import { useSelector } from 'react-redux';
import CheckoutComponent from '~/components/Checkout';
function Checkout() {
  const currentCheckout = useSelector((state) => state?.order.checkout.checkoutResult);
  const checkoutOrder = currentCheckout?.metadata.checkout_order;
  const checkoutData = {
    subtotal: checkoutOrder?.totalPrice,
    feeShip: checkoutOrder?.feeShip,
    discount: checkoutOrder?.totalDiscount,
    total: checkoutOrder?.totalCheckout,
  };
  return <CheckoutComponent data={checkoutData} />;
}

export default Checkout;
