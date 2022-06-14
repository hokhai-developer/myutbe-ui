import Home from '~/pages/Home';
import Login from '~/pages/Login';
import { LoginLayout } from '~/layouts';

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: LoginLayout },
];

export const privateRoutes = [];
