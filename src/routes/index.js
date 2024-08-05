import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';
import HeaderAndFooter from '~/layouts/HeaderAndFooter';
import ShopDefaultLayout from '~/layouts/ShopDefaultLayout';
import ShopHeaderOnly from '~/layouts/ShopHeaderNoLogo/ShopHeaderNoLogo';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Product from '~/pages/Product';
import ProductDetailContainer from '~/pages/ProductDetailContainer';
import ShopSignin from '~/pages/ShopSignin';
import ShopSignup from '~/pages/ShopSignup';
import UserSignin from '~/pages/UserSignin';
import UserSignup from '~/pages/UserSignup';
import ShopHome from '~/pages/ShopHome';
import ShopDraft from '~/pages/ShopDraft';
import ShopPublished from '~/pages/ShopPublished';
import ShopCreateProduct from '~/pages/ShopCreateProduct';
import ShopEditProduct from '~/pages/ShopEditProduct';
import ShopCreateDiscount from '~/pages/ShopCreateDiscount';
import ShopRestoreDiscount from '~/pages/ShopRestoreDiscount';
import Cart from '~/pages/Cart';
import Discount from '~/pages/Discount';
import Payment from '~/pages/Payment';
import HeaderNoLogo from '~/layouts/HeaderNoLogo';
import Checkout from '~/pages/Checkout';
import ShopOrder from '~/pages/ShopOrder';
import UserLobby from '~/components/UserLobby';
import Voucher from '~/pages/Voucher';
import ShopView from '~/pages/ShopView';
import ShopLobby from '~/components/ShopLobby';
import Message from '~/pages/Message';
import ShopMessage from '~/pages/ShopMessage';
import ShopCreateProductVariance from '~/pages/ShopCreateProductVariance';
import ShopEditProductVariance from '~/pages/ShopEditProductVariance';
import ShopVariance from '~/pages/ShopVariance';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.live, component: Live },
  { path: config.routes.product, component: Product },
  { path: config.routes.productDetail, component: ProductDetailContainer, layout: HeaderAndFooter },
  { path: config.routes.shopSignin, component: ShopSignin, layout: null },
  { path: config.routes.shopSignup, component: ShopSignup, layout: null },
  { path: config.routes.userSignin, component: UserSignin, layout: null },
  { path: config.routes.userSignup, component: UserSignup, layout: null },
  { path: config.routes.shopHome, component: ShopHome, layout: ShopDefaultLayout },
  { path: config.routes.voucher, component: Voucher, layout: HeaderAndFooter },
  { path: config.routes.shopView, component: ShopView, layout: HeaderAndFooter },
  { path: config.routes.userChat, component: Message, layout: HeaderNoLogo },
  { path: config.routes.shopChat, component: ShopMessage, layout: ShopHeaderOnly },
];

const privateRoutes = [
  { type: 'shop', path: config.routes.shopDiscounts, component: Discount, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopDraft, component: ShopDraft, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopPublished, component: ShopPublished, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopCreateProduct, component: ShopCreateProduct, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopOrders, component: ShopOrder, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopEditProduct, component: ShopEditProduct, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopCreateDiscount, component: ShopCreateDiscount, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopEditVariant, component: ShopEditProductVariance, layout: ShopDefaultLayout },
  {
    type: 'shop',
    path: config.routes.shopCreateProductVariants,
    component: ShopCreateProductVariance,
    layout: ShopDefaultLayout,
  },
  {
    type: 'shop',
    path: config.routes.shopProductVariants,
    component: ShopVariance,
    layout: ShopDefaultLayout,
  },
  { type: 'shop', path: config.routes.shopRestoreDiscount, component: ShopRestoreDiscount, layout: ShopDefaultLayout },
  { type: 'user', path: config.routes.userCart, component: Cart, layout: HeaderAndFooter },
  { type: 'user', path: config.routes.payment, component: Payment, layout: HeaderNoLogo },
  { type: 'user', path: config.routes.lobby, component: UserLobby, layout: HeaderNoLogo },
  { type: 'shop', path: config.routes.shop, component: ShopLobby, layout: ShopHeaderOnly },
  { type: 'user', path: config.routes.checkout, component: Checkout, layout: HeaderNoLogo },
];

export { publicRoutes, privateRoutes };
