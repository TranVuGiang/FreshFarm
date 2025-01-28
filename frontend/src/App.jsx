import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "@/routes/index";
import { Fragment, Suspense } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import LoadingPage from "./components/loading";
import ScrollToTop from "./utils/ScrollToTop";

export default function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}
