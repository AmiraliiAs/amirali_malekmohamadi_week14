import React from "react";
import styles from "./Modal.module.css";

function Modal({ open, onClose, onConfirm, text }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{text}</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirm}>
            تایید
          </button>
          <button onClick={onClose} className={styles.cancel}>
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
