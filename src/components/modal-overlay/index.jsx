import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const ModalOverlay = ({ onClose }) => { 
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}

export default ModalOverlay