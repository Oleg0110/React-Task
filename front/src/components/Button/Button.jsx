import styles from "./Button.module.scss"

const Button = ({ children, buttonStyle }) => {
   return <button className={styles[buttonStyle]}> {children}</button >;
}

export default Button