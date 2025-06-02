import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store/index';
import { moveIngredient, removeIngredient } from '@slices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {

    const dispatch = useDispatch();
    const constructorItems = useSelector((state) => state.builder);

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredient({ index, upwards: true }));
      }
    };
    
    const handleMoveDown = () => {
      if (index < constructorItems.ingredients.length - 1) {
        dispatch(moveIngredient({ index, upwards: false }));
      }
    };

    const handleClose = () => {
      if (ingredient) {
        dispatch(removeIngredient(ingredient.id));
      }

    };

    

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
