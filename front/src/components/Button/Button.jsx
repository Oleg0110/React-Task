import styles from "./Button.module.scss"

const Button = ({ children, buttonStyle, onClick }) => {
   return <button className={styles[buttonStyle]} onClick={onClick}> {children}</button >;
}

export default Button