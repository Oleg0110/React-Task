import styles from "./TextBox.module.scss"


const TextBox = ({ inputStyle, error, innerRef, placeholder, type }) => {
   // console.log(innerRef);

   return (
      <div>
         <input className={styles[inputStyle]} ref={innerRef}
            placeholder={placeholder} type={type} />
         {{ error } && <p className={styles.errorPosition}>{error}</p>}
      </div>
   )
}

export default TextBox