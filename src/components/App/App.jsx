import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
// import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/selectors.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
// import { PrivateRoute } from '../Routes/PrivateRoute.jsx';
import { RestrictedRoute } from '../Routes/RestrictedRoute.jsx';
import { Toaster } from 'react-hot-toast';
import { refreshUser } from '../../redux/auth/operations.js';

// import AuthNav from '../AuthNav/AuthNav.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import Layout from '../Layout/Layout.jsx';

const Login = lazy(() => import('../../pages/Login/Login.jsx'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound.jsx'));
const Registration = lazy(() => import('../../pages/Registration/Registration.jsx'));
// const Contacts = lazy(() => import('../../pages/Contacts/Contacts.jsx'));
const ScreensPage = lazy(() => import('../../components/ScreensPage/ScreensPage.jsx'));

export default function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Toaster position='top-center' />
      <Layout>
        <Suspense fallback={<div>LOADING PAGE...</div>}>
          {isRefreshing ? (
            <b>Please wait...</b>
          ) : (
            <Routes>
              {/* <Route path='/' element={isLoggedIn ? <HomePage /> : <Login />} /> */}
              <Route path='/home' element={<HomePage />} />
              {/* <Route
                path='/contacts'
                element={<PrivateRoute component={<Contacts />} redirectTo='/login' />}
              /> */}
              <Route
                path='/register'
                element={<RestrictedRoute component={<Registration />} redirectTo='/home' />}
              />
              <Route
                path='/login'
                element={<RestrictedRoute component={<Login />} redirectTo='/home' />}
              />
              {/* <Route
                path='/home'
                element={
                  isLoggedIn ? (
                    <PrivateRoute component={<HomePage />} redirectTo='/login' />
                  ) : (
                    <AuthNav />
                  )
                }
              /> */}
              <Route path='/home/:boardId' element={<ScreensPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          )}
        </Suspense>
      </Layout>
    </>
  );
}
