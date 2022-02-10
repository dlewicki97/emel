import Listing from '@/pages/Listing';
import Product from '@/pages/Product';
import LoginRegister from '@/pages/auth/LoginRegister';
import AccountActivation from '@/pages/auth/AccountActivation';
import AccountSettings from '@/pages/auth/AccountSettings';

import MyOrders from '@/pages/orders/MyOrders';
import OrderDetails from '@/pages/orders/OrderDetails';

import FavouriteProducts from '@/pages/favouriteProducts/FavouriteProducts';
import Cart from '@/pages/cart/Cart';

import ThankYou from '@/pages/cart/ThankYou';

let baseUrl = window.location.origin.includes('localhost:8080') ? '' : `/emel`;
if (!window.location.origin.includes('localhost')) baseUrl = '';

function prefixRoutes(prefix, routes) {
  return routes.map(
    (route) => ((route.path = prefix + '/' + route.path), route)
  );
}

const routes = [
  {
    path: `${baseUrl}/sklep/`,
    component: Listing,
    name: 'Listing',
    children: [
      {
        path: 'kategoria/:category_id/strona/:page',
        component: Listing,
        name: 'ListingCategoryPage',
      },
      {
        path: 'strona/:page',
        component: Listing,
        name: 'ListingPage',
      },
    ],
  },
  {
    path: `${baseUrl}/zaloguj`,
    component: LoginRegister,
    name: 'LoginRegister',
    meta: { metaTitle: 'Logowanie/rejestracja' },
  },
  {
    path: `${baseUrl}/dziekujemy/:order_uuid`,
    component: ThankYou,
    name: 'ThankYou',
    meta: { metaTitle: 'Dziękujemy za złożenie zamówienia' },
  },
  {
    path: `${baseUrl}/konto-aktywowane`,
    component: AccountActivation,
    name: 'AccountActivation',
    meta: { metaTitle: 'Aktywacja konta' },
  },
  ...prefixRoutes(`${baseUrl}/profil`, [
    {
      path: 'ustawienia',
      name: 'AccountSettings',
      meta: { metaTitle: 'Ustawienia konta' },
      component: AccountSettings,
    },
    {
      path: 'zamowienia',
      name: 'MyOrders',
      meta: { metaTitle: 'Moje zamówienia' },
      component: MyOrders,
    },
  ]),

  {
    path: `${baseUrl}/produkt/:product_name/:product_id/kategoria/:category_name`,
    component: Product,
    name: 'Product',
  },
  {
    path: `${baseUrl}/koszyk`,
    component: Cart,
    name: 'Cart',
    meta: { metaTitle: 'Koszyk' },
  },
  {
    path: `${baseUrl}/szczegoly-zamowienia/:order_id`,
    component: OrderDetails,
    name: 'OrderDetails',
  },
  {
    path: `${baseUrl}/ulubione`,
    component: FavouriteProducts,
    name: 'FavouriteProducts',
  },
];

export default routes;
