import Vue from 'vue';
import Vuex from 'vuex';
import Setup from './modules/setupModule.js';
import HurtCheckbox from './modules/hurtCheckboxModule.js';
import Session from './modules/sessionModule.js';
import Settings from './modules/settingsModule.js';
import CountryList from './modules/countryListModule.js';
import ContactSettings from './modules/contactSettingsModule.js';
import PoradnikCategory from './modules/poradnikCategoryModule.js';
import XSid from './modules/xSidModule.js';
import Category from './modules/categoriesModule.js';
import Products from './modules/productsModule.js';
import Filters from './modules/filtersModule.js';
import Types from './modules/typesModule.js';
import MobileFilters from './modules/mobileFiltersModule.js';
import MobileCategories from './modules/mobileCategoriesModule.js';
import FiltersDropdowns from './modules/filtersDropdownsModule';
import SizeList from './modules/sizeListModule';
import ChangeFiltersFlag from './modules/changeFiltersFlagModule';
import AlertBox from './modules/alertBox/alertBoxModule';

import RegisterInputs from './modules/auth/registerInputsModule';
import AccountSettingsInputs from './modules/auth/accountSettingsInputsModule';
import Register from './modules/auth/registerModule';
import Login from './modules/auth/loginModule';
import User from './modules/auth/userModule';
import Logout from './modules/auth/logoutModule';
import AutoLogin from './modules/auth/autoLoginModule';
import UserAddresses from './modules/auth/userAddressesModule';

import ListingSessionStorageKeys from './modules/listing/sessionStorageKeysModule';

import InputsValidation from './modules/validation/inputsValidationModule';
import CurrentInputs from './modules/validation/currentInputsModule';

import ProductLinks from './modules/product/productLinksModule';

import Loading from './modules/layout/loadingModule';
import ListingLoading from './modules/listingLoading/listingLoadingModule';

import FavouriteProducts from './modules/favouriteProducts/favouriteProductsModule';

import MetaTitle from './modules/seo/metaTitleModule';

import CartStepIndex from './modules/cart/cartStepIndexModule';
import Cart from './modules/cart/cartModule';
import CartUserDataInputs from './modules/cart/cartUserDataInputsModule';
import CartUserDataInvoiceInputs from './modules/cart/cartUserDataInvoiceInputsModule';
import Deliveries from './modules/cart/deliveriesModule';
import DeliveryPrices from './modules/deliveryPrices/deliveryPricesModule';
import Payments from './modules/cart/paymentsModule';
import CartProductsData from './modules/cart/cartProductsDataModule';

import MyOrders from './modules/orders/myOrdersModule';

import SearchedProducts from './modules/searchedProducts/searchedProductsModule';
import SearchedProductsLoading from './modules/searchedProducts/searchedProductsLoadingModule';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    MyOrders,
    DeliveryPrices,
    SearchedProducts,
    SearchedProductsLoading,
    CartProductsData,
    ListingLoading,
    Setup,
    Deliveries,
    Payments,
    Cart,
    CartUserDataInputs,
    CartUserDataInvoiceInputs,
    CartStepIndex,
    MetaTitle,
    FavouriteProducts,
    ProductLinks,
    CurrentInputs,
    InputsValidation,
    Logout,
    AutoLogin,
    UserAddresses,
    ListingSessionStorageKeys,
    AccountSettingsInputs,
    AlertBox,
    Loading,
    User,
    Register,
    Login,
    RegisterInputs,
    Settings,
    HurtCheckbox,
    CountryList,
    ContactSettings,
    Session,
    PoradnikCategory,
    XSid,
    Category,
    Products,
    Filters,
    Types,
    MobileFilters,
    MobileCategories,
    FiltersDropdowns,
    SizeList,
    ChangeFiltersFlag,
  },
});
