import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Modal: React.FC<{ isOpen?: boolean | any }> = ({ isOpen, children }) => {
  const modalRoot = document.getElementById('modal-root')
  const el = document.createElement('div')
  useEffect(() => {
    modalRoot?.appendChild(el)
    return () => {
      modalRoot?.removeChild(el)
    }
  }, [el, modalRoot])
  return (
    isOpen &&
    createPortal(
      <div
        style={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </div>,
      el
    )
  )
}

export default Modal
