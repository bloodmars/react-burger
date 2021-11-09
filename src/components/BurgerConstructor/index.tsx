import React from 'react'
import styles from './styles.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'

interface Props {
  ingredients: Array<IngredientInterface>
}

interface State {
  current: string
}

export default class BurgerConstructor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { current: '1' }
  }

  changeTab(tabValue: string) {
    this.setState({current: tabValue});
  }

  render() {
    const Ingredient = ({ data }: { data: IngredientInterface }) => {
      return (
        <div className={`${styles.ingredient} mb-8`}>
          <Counter count={1} size="default" />
          <img className={`${styles.image} ml-4 mr-4 mb-1`} src={data.image} />
          <p className={`${styles.price} text text_type_digits-default mb-1`}>
            <span className="mr-2">{data.price}</span>
            <CurrencyIcon type="primary" />
          </p>
          <p className={`${styles.name} text text_type_main-default`}>{data.name}</p>
        </div>
      )
    } 

    return (
      <>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={`${styles.tab} mb-10`}>
          <Tab value="1" active={this.state.current === '1'} onClick={() => this.changeTab('1')}>Булки</Tab>
          <Tab value="2" active={this.state.current === '2'} onClick={() => this.changeTab('2')}>Соусы</Tab>
          <Tab value="3" active={this.state.current === '3'} onClick={() => this.changeTab('3')}>Начинки</Tab>
        </div>
        <div>
          <h2 className="text text_type_main-medium">Булки</h2>     
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {this.props.ingredients.filter(element => element.type === 'bun').map(element => (
              <Ingredient data={element} key={element._id} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {this.props.ingredients.filter(element => element.type === 'sauce').map(element => (
              <Ingredient data={element} key={element._id} />
            ))}
          </div>          
        </div>
        <div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {this.props.ingredients.filter(element => element.type === 'main').map(element => (
              <Ingredient data={element} key={element._id} />
            ))}
          </div>          
        </div>
      </>
    )
  }
}