import React, { lazy, Suspense } from 'react';
import ReactDOM from "react-dom/client";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import * as serviceWorker from '../serviceWorker';
import { BrowserRouter } from "react-router-dom";

const Register = lazy(() => import('auth/Register').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
)

const Login = lazy(() => import('auth/Login').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
)

const InfoTooltip = lazy(() => import('auth/InfoTooltip').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
)

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  console.log('currentUser', currentUser)

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        console.log(err);
      });
  }, [history, isLoggedIn]);

  // подписываемся на события микрофронтенда auth
  React.useEffect(() => {
    const onAuthSucceeded = (event) => {
      setIsLoggedIn(true);
      setEmail(event.detail.email)
      history.push("/");
    }
    const onRegisterSucceeded = () => {
      setTooltipStatus("success");
      setIsInfoToolTipOpen(true);
      history.push("/signin");
    }
    const onAuthOrRegisterFailed = () => {
      setTooltipStatus("fail");
      setIsInfoToolTipOpen(true);
    }
    addEventListener("auth-succeeded", onAuthSucceeded);
    addEventListener("register-succeeded", onRegisterSucceeded);
    addEventListener("auth-or-register-failed", onAuthOrRegisterFailed);
    return () => {
      removeEventListener("auth-succeeded", onAuthSucceeded);
      removeEventListener("register-succeeded", onRegisterSucceeded);
      removeEventListener("auth-or-register-failed", onAuthOrRegisterFailed);
    }
  }, []);

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          user={currentUser}
          loggedIn={isLoggedIn}
        />
        <Route path="/signup">
          <Suspense>
            <Register history={history} />
          </Suspense>
        </Route>
        <Route path="/signin">
          <Suspense>
            <Login />
          </Suspense>
        </Route>
      </Switch>
      <Footer />
      <Suspense>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={() => setIsInfoToolTipOpen(false)}
          status={tooltipStatus}
        />
      </Suspense>
    </div>
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('app'),
// )

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
