import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "@/routes/index";
import { Fragment, Suspense } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import LoadingPage from "./components/loading/index";
import ScrollToTop from "./utils/ScrollToTop";
import { DataProvider } from "./constants/DataProvider";
import PrivateRoute from "./utils/privateRoute";

export default function App() {

  return (
   <DataProvider>
     <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = route.layout || DefaultLayout;
            Layout = Layout === null ? Fragment : Layout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Suspense fallback={<LoadingPage />}>
                      <Page />
                    </Suspense>
                  </Layout>
                }
              />
            );
          })}

           {/* Render Private Routes */}
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout || DefaultLayout;
              Layout = Layout === null ? Fragment : Layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute
                      element={
                        <Layout>
                          <Suspense fallback={<LoadingPage />}>
                            <Page />
                          </Suspense>
                        </Layout>
                      }
                      roles={route.roles} // Chỉ định role được phép truy cập
                    />
                  }
                />
              );
            })}
        </Routes>
      </div>
    </Router>
   </DataProvider>
  );
}
