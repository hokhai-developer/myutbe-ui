import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from './redux/selectors';
import userSlice from './redux/userSlice';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const values = Object.values(currentUser);
    if (values.length === 0) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { displayName, email, uid, photoURL } = user;
          dispatch(
            userSlice.actions.setUser({ displayName, email, uid, photoURL }),
          );
        }
      });
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, id) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                path={route.path}
                key={id}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
