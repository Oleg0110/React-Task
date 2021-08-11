import styles from "./EmptyPage.module.scss"

const EmptyPage = ({ children }) => {
   return (<div className={styles.backFon}>
      <h1 className={styles.title}>Sorry.</h1>
      <p className={styles.text}>The page is being developed in the future there will be content</p>
      <hr />
      {children}
   </div>

   )
}

export default EmptyPage