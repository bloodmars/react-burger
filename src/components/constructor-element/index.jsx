import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css';
import { ConstructorElement as ConstructorElementBase, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { REORDER_ITEM, BUILDER_REMOVE_ITEM } from 'services/actions/builder'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'

const ConstructorElement = ({ isLocked, type, text, price, thumbnail, index }) => {
  const dispatch = useDispatch()
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'order',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId()
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch({
        type: REORDER_ITEM,
        payload: { dragIndex, hoverIndex }
      })
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
      type: 'order',
      item: { index }
  })

  const removeIngredientHandler = () => {
    dispatch({
      type: BUILDER_REMOVE_ITEM,
      payload: index
    })
  }

  drag(drop(ref))

  return (
    <div 
      className={styles.element} 
      {...(!isLocked && {ref: ref})}
      data-handler-id={handlerId}
    >
      {!isLocked && <DragIcon type="primary"/>}
      <ConstructorElementBase
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={removeIngredientHandler}
      />  
    </div>
  )
}

ConstructorElement.propTypes = {
  isLocked: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  index: PropTypes.number
}

export default ConstructorElement

