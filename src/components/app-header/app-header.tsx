import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/index';

export const AppHeader: FC = () => {
    const { user } = useSelector((state) => state.user);
    return <AppHeaderUI userName={user.name} />;
}

    
