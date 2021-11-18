import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../../components/ModalOverlay'
import styles from './styles.module.css'

const modalRoot = document.getElementById("modals") as HTMLElement

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
}

const Modal = (props: Props) => {
  useEffect(() => {
    document.addEventListener("keyup", trackKeyUp)

    return () => {
      document.removeEventListener("keyup", trackKeyUp)
    }
  }, [])

  const trackKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClick()
    }
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={props.onClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.top} m-10`}>
          <div className='text text_type_main-large'>{props.title}</div>
          <div className={styles.close} onClick={props.onClick}><CloseIcon type="primary"/></div>
        </div>
        <div className={styles.body}>
          {props.children}
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

export default Modal