import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/index';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { fetchFeeds } from '@slices';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch = useDispatch();
  const { orders, total, totalToday, isLoading, error } = useSelector((state) => state.feed);

  const feed = {total, totalToday};

  // useEffect(() => {
  //   dispatch(fetchFeeds());
  // }, [dispatch]);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  // if (isLoading) return <p>Загрузка...</p>;
  // if (error) return <p>Ошибка: {error}</p>;
  // console.log(total, totalToday, "Feed Info");

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
