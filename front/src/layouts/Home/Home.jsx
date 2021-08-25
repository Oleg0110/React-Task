import useMediaQuery from "../../hooks/useMedia"
import styles from "./Home.module.scss"

const Home = ({ children }) => {

   const smallDevices = useMediaQuery("(max-width: 576px)")

   return (<div className={styles.backFon}>
      <h1 className={`${styles.title} ${smallDevices && styles.titleMedia}`}>My name is <span className={styles.myName}>Oleg</span></h1>
      <h3 className={`${styles.projectTitle} ${smallDevices && styles.projectTitleMedia}`}> <span className={styles.react}>React</span> project</h3>
      <hr className={styles.line} />
      {children}
   </div>

   )
}

export default Home