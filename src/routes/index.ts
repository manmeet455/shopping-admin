import { lazy } from 'react';

const details = lazy(() => import('../pages/GiftIdeas/details'));
const editDetails = lazy(() => import('../pages/GiftIdeas/editDetails'));
const GiftIdeas = lazy(() => import('../pages/GiftIdeas'));
const GiftBundles = lazy(() => import('../pages/GiftBundles'));
const Products = lazy(() => import('../pages/Products/index'));
const AffiliatedProducts = lazy(() => import('../pages/Products/AffiliatedProducts'));

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
];

const routes = [...coreRoutes];
export default routes;
