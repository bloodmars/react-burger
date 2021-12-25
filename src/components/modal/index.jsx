import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from 'components/modal-overlay'
import styles from './styles.module.css'

const modalRoot = document.getElementById('modals')

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const trackKeyUp = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener("keyup", trackKeyUp)
    return () => {
      document.removeEventListener("keyup", trackKeyUp)
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.top} m-10`}>
          <div className='text text_type_main-large'>{title}</div>
          <div className={styles.close} onClick={onClose}><CloseIcon type="primary"/></div>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
      <ModalOverlay onClose={onClose}></ModalOverlay>
    </>,
    modalRoot
  )
}

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.object
}

export default Modal