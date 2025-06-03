import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useDispatch, useSelector } from '../../services/store/index';
import { fetchIngredients } from '@slices';


export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch = useDispatch();

  const { items: allIngredients, isLoading, error } = useSelector(state => state.ingredients);
  const buns = allIngredients.filter((item: TIngredient) => item.type === 'bun');
  const mains = allIngredients.filter((item: TIngredient) => item.type === 'main');
  const sauces = allIngredients.filter((item: TIngredient) => item.type === 'sauce');


  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // Можно добавить лоадер или сообщение об ошибке:
  // if (isLoading) return <p>Загрузка ингредиентов...</p>;
  // if (error) return <p className="text text_type_main-default text_color_error">{error}</p>;

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // console.log(allIngredients);


  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};


