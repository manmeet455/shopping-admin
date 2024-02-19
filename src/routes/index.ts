import { lazy } from 'react';

const details = lazy(() => import('../pages/GiftIdeas/details'));
const editDetails = lazy(() => import('../pages/GiftIdeas/editDetails'));
const GiftIdeas = lazy(() => import('../pages/GiftIdeas'));
const GiftBundles = lazy(() => import('../pages/GiftBundles'));
const Products = lazy(() => import('../pages/Products/index'));
const AffiliatedProducts = lazy(() => import('../pages/Products/AffiliatedProducts'));
const ViewAffiliateProductDetails = lazy(() => import('../pages/Products/ViewAffiliateProductDetails'));
const Users = lazy(() => import('../pages/Users/index'));

const coreRoutes = [
  {
    path: '/gift-ideas',
    title: 'Gift Ideas Card',
    component: GiftIdeas,
  },
  {
    path: '/gift-bundles',
    title: 'Gift Bundles Card',
    component: GiftBundles
  },
  {
    path: '/details/:id',
    title: 'Gift Details',
    component: details
  },
  {
    path: '/editDetails/:id',
    title: 'editDetails',
    component: editDetails
  },
  {
    path: '/products',
    title: 'productsCard',
    component: Products
  },
  
  {
    path: '/affiliated-products',
    title: 'affiliated-products',
    component: AffiliatedProducts
  },
  {
    path: '/suscel-products',
    title: 'suscel-products',
    component: AffiliatedProducts
  },

  {
    path: '/view-affiliated-products/:id',
    title: 'affiliated-products',
    component: ViewAffiliateProductDetails
  },
  {
    path: '/view-suscel-products/:id',
    title: 'view-suscel-products',
    component: ViewAffiliateProductDetails
  },

  {
    path: '/edit-affiliated-products/:id',
    title: 'affiliated-products',
    component: ViewAffiliateProductDetails
  },
  {
    path: '/edit-suscel-products/:id',
    title: 'affiliated-products',
    component: ViewAffiliateProductDetails
  },

  {
    path: '/users',
    title: 'users',
    component: Users
  },
];

const routes = [...coreRoutes];
export default routes;
