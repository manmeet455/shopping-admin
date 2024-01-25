import { lazy } from 'react';
// import { ViewCategories } from '../customComponents/ViewCategories';
const details = lazy(() => import('../pages/GiftIdeas/details'));
const editDetails = lazy(() => import('../pages/GiftIdeas/editDetails'));
const GiftIdeas = lazy(() => import('../pages/GiftIdeas'));
const GiftBundles = lazy(() => import('../pages/GiftBundles'));

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
  }
];

const routes = [...coreRoutes];
export default routes;
