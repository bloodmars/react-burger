import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from 'components/modal-overlay'
import styles from './styles.module.css'

const modalRoot = document.getElementById('modals')

const Modal = (props) => {
  useEffect(() => {
    const trackKeyUp = (e) => {
      if (e.key === 'Escape') {
        props.onClose()
      }
    }

    document.addEventListener("keyup", trackKeyUp)
    return () => {
      document.removeEventListener("keyup", trackKeyUp)
    }
  }, [props.onClose])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.top} m-10`}>
          <div className='text text_type_main-large'>{props.title}</div>
          <div className={styles.close} onClick={props.onClose}><CloseIcon type="primary"/></div>
        </div>
        <div className={styles.body}>
          {props.children}
        </div>
      </div>
      <ModalOverlay onClose={props.onClose}></ModalOverlay>
    </>,
    modalRoot
  )
}

export default Modal