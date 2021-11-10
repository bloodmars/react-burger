import React from 'react';
import styles from './styles.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'

interface Props {
  ingredientTop: IngredientInterface,
  ingredientBottom: IngredientInterface,
  ingredientsMiddle: Array<IngredientInterface>,
  ingredientsLength: number
}

interface State {}

export default class BurgerIngredients extends React.Component<Props, State> {
  render() {
    return (
      <>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={this.props.ingredientTop.name}
          price={this.props.ingredientTop.price}
          thumbnail={this.props.ingredientTop.image}
        /> 

        <div className={styles.scroller}>
          {this.props.ingredientsMiddle.map((element, index) => {
            return (
              <div className={styles.draggable} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement       
                  isLocked={false}
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />  
              </div>          
            )
          })}
        </div>

        <ConstructorElement       
          type="bottom"
          isLocked={true}
          text={this.props.ingredientBottom.name}
          price={this.props.ingredientBottom.price}
          thumbnail={this.props.ingredientBottom.image}
        />
        <div className={`${styles.total} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <span className="text text_type_digits-medium">610</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </>
    )
  }
}