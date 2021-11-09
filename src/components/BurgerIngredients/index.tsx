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
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className={`${styles.box} mt-25 mb-10 mr-4`}>
          <ConstructorElement       
            type="top"
            isLocked={true}
            text={this.props.ingredientTop.name}
            price={this.props.ingredientTop.price}
            thumbnail={this.props.ingredientTop.image}
          /> 

          <div className={styles.middle}>
            {this.props.ingredientsMiddle.map((element, index) => {
              const isFirst = index === 0 ? true : false
              const isLast = this.props.ingredientsLength === index ? true : false
              return (
                <div className={styles.draggable}>
                  <DragIcon type="primary" />
                  <ConstructorElement       
                    isLocked={false}
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                    key={index}
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
        </div>
        <div className={`${styles.total} mr-4 `}>
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