import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';
import HeaderAndFooter from '~/layouts/HeaderAndFooter';
import ShopDefaultLayout from '~/layouts/ShopDefaultLayout';

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
];

const privateRoutes = [
  { type: 'shop', path: config.routes.shopDraft, component: ShopDraft, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopPublished, component: ShopPublished, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopCreateProduct, component: ShopCreateProduct, layout: ShopDefaultLayout },
  { type: 'shop', path: config.routes.shopEditProduct, component: ShopEditProduct, layout: ShopDefaultLayout },
];

export { publicRoutes, privateRoutes };
