import React from 'react'
import styles from './styles.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'
import Ingredient from '../.././components/Ingredient'

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
    return (
      <>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={`${styles.tab} mb-10`}>
          <Tab value="1" active={this.state.current === '1'} onClick={() => this.changeTab('1')}>Булки</Tab>
          <Tab value="2" active={this.state.current === '2'} onClick={() => this.changeTab('2')}>Соусы</Tab>
          <Tab value="3" active={this.state.current === '3'} onClick={() => this.changeTab('3')}>Начинки</Tab>
        </div>
        <div className={styles.scroller}>
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
        </div>
      </>
    )
  }
}