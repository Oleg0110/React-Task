import styles from "./Home.module.scss"

const Home = ({ children }) => {
   return (<div className={styles.backFon}>
      <h1 className={styles.title}>My name is <span className={styles.myName}>Oleg</span></h1>
      <div>
         <h3 className={styles.projectTitle}> <span className={styles.react}>React</span> project</h3>
         <hr />
      </div>
      {children}
   </div>

   )
}

export default Home