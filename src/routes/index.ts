import { lazy } from 'react';

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
];

const routes = [...coreRoutes];
export default routes;
