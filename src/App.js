import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { useSelector } from 'react-redux';
import DefaultLayout from './layouts';

function App() {
  const currentShop = useSelector((state) => state.authShop.signin.currentShop);
  const currentUser = useSelector((state) => state.authUser.signin.currentUser);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout >
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
          {currentShop &&
            privateRoutes.map((route, index) => {
              if (route.type === 'shop') {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                );
              }
            })}
          {currentUser &&
            privateRoutes.map((route, index) => {
              if (route.type === 'user') {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                );
              }
            })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
