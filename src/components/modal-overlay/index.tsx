import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'

interface Props {
  onClose: () => void;
}

const ModalOverlay: FC<Props>  = (props) => { 
  return (
    <div className={styles.overlay} onClick={props.onClose}></div>
  )
}

export default ModalOverlay