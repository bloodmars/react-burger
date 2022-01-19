import React, { FC } from 'react'
import styles from './styles.module.css'

interface IProps {
  onClose: () => void;
}

const ModalOverlay: FC<IProps> = ({ onClose }) => { 
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay