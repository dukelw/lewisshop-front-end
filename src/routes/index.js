import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';
import HeaderAndFooter from '~/layouts/HeaderAndFooter';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Product from '~/pages/Product';
import ProductDetailContainer from '~/pages/ProductDetailContainer';
import ShopSignin from '~/components/ShopSignin';
import ShopSignup from '~/components/ShopSignup';

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
