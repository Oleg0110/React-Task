import styles from "./TextBox.module.scss"


const TextBox = ({ inputStyle, error, ref, placeholder, type }) => {


   return (
      <div>
         <input className={styles[inputStyle]} ref={ref}
            placeholder={placeholder} type={type} />
         {error && <p className={styles.errorPosition}>{error}</p>}
      </div>
   )
}

export default TextBox