import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';




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
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/profile/orders' element={<ProfileOrders/>} />
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
              // <ProtectedRout onlyUnAuth={false}>
                <Modal onClose={handleModalClose} title='Информация о заказе пользователя'>
                  <OrderInfo />
                </Modal>
              // </ProtectedRoute>
            }
          />}
        </Routes>
      )}

  </div>
  );
};

export default App;
