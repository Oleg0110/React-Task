import React from "react"
import styles from "./TextBox.module.scss"

interface ITextBox {
   inputStyle?: string,
   error?: string
   placeholder?: string,
   innerRef?: string
   type?: string,
}

const TextBox: React.FC<ITextBox> = ({ inputStyle, error, innerRef, placeholder, type }) => {

   return (
      <div>
         <input className={inputStyle ? styles[inputStyle] : ''} ref={innerRef}
            placeholder={placeholder} type={type} />
         {error && <p className={styles.errorPosition}>{error}</p>}
      </div>
   )
}

export default TextBox