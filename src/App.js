import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, id) => {
            const Layout = route.layout || <DefaultLayout />;
            return (
              <Route
                path={route.path}
                key={id}
                element={<DefaultLayout>{route.page}</DefaultLayout>}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
