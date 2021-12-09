import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'

const ModalOverlay = (props) => { 
  return (
    <div className={styles.overlay} onClick={props.onClose}></div>
  )
}

export default ModalOverlay