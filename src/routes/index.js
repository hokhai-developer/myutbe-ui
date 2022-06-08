import Explore from '~/pages/Explore';
import Home from '~/pages/Home';
import Shorts from '~/pages/Shorts';
import Subscriptions from '~/pages/Subscriptions';

export const publicRoutes = [
  { path: '/', page: <Home /> },
  { path: '/explore', page: <Explore /> },
  { path: '/shorts', page: <Shorts /> },
  { path: '/subscriptions', page: <Subscriptions /> },
];

export const privateRoutes = [];
