import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const ModalOverlay = (props: Props) => { 
  return (
    <div className={styles.overlay} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default ModalOverlay