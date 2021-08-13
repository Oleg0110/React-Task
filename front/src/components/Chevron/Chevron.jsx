import styles from "./Chevron.module.scss"

const Chevron = ({ icon }) => {
   return (
      <div className={`${styles.icon} ${styles[`icon-${icon}`]}`} />

   )
}

export default Chevron