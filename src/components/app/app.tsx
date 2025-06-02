import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';




const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;

  const handleModalClose = () => {
    navigate(-1);
  };


  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage/>} />
        <Route path='/feed' element={<Feed/>} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login/></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register/></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword/></ProtectedRoute>} />
        <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth><ResetPassword/></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path='/profile/orders' element={<ProtectedRoute ><ProfileOrders/></ProtectedRoute>} />
        <Route path='*' element={<NotFound404/>} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={handleModalClose} title="Информация о заказе">
                <OrderInfo />
              </Modal>
            }
          />
          {<Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <Modal onClose={handleModalClose} title='Информация о заказе пользователя'>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />}
        </Routes>
      )}

  </div>
  );
};

export default App;
