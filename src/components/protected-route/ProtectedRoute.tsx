import { Preloader } from '@ui';
import { useSelector} from '../../services/store';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
    const location = useLocation();

    const {isAuthenticated, user } = useSelector((state) => state.user);

    // if (!isAuthenticated) { // пока идёт чекаут пользователя, показываем прелоадер
    //     return <Preloader />;
    // }

    if (!onlyUnAuth && (!user.email || !user.name)) { // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
        return <Navigate replace to='/login' state={{ from: location }} />;
    }

    if (onlyUnAuth && user.email && user.name) { // если пользователь на странице авторизации и данные есть в хранилище
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate replace to={from} />;
    }

        return children ;
}