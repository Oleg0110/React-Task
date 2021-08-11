import styles from "./Projects.module.scss"

const Projects = ({ children }) => {
   return (<div className={styles.backFon}>
      <h1 className={styles.title}>Sorry.</h1>
      <p className={styles.text}>The page is being developed in the future there will be content</p>
      <hr />
      {children}
   </div>

   )
}

export default Projects