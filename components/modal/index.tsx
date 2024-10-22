import React, { FC } from 'react'
import styles from './index.module.css'

type confirmationModalProps ={
  handleDeletePokemon : () => void;
  setShowConfirmationModal: (isShowing: boolean) => void;
}
const ConfirmationModal:FC<confirmationModalProps> = ({handleDeletePokemon, setShowConfirmationModal}) => {
  return (
    <div className={styles.confirmationModalWrapper}>
        <div className={styles.confirmationModal}>
          <p>Are you sure you want to delete this pokemon? </p>
          <div className={styles.confirmationOptions}>
            {/*  */}
            <p onClick={handleDeletePokemon}>Yes</p> 
            <p onClick={() => setShowConfirmationModal(false)}>No</p>
          </div>
        </div>
      </div>
  )
}

export default ConfirmationModal