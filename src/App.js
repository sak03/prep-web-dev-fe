import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme/themes";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { MainDiv } from "./styled-components/generaltags";

const loading = (
  <MainDiv
    className="d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <div>Loading ...</div>
  </MainDiv>
);

const Home = React.lazy(()=> import('./views/admin/home/Home'))
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const ForgotPassword = React.lazy(() =>
  import("./views/pages/forgot-password/ForgotPassword")
);
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

function App() {
  const theme = lightTheme;

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route exact path="/*" element={<ProtectedRoutes />}>
                <Route
                  exact
                  path="*"
                  name="Dashboard"
                  element={<DefaultLayout />}
                />
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
