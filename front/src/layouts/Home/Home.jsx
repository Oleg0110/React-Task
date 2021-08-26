import useMediaQuery from "../../hooks/useMedia"
import { SMALL_DEVISCES } from "../../utils/constants"
import styles from "./Home.module.scss"

const Home = ({ children }) => {

   const smallDevices = useMediaQuery(SMALL_DEVISCES)

   return (<div className={styles.backFon}>
      <h1 className={`${styles.title} ${smallDevices && styles.titleSD}`}>My name is <span className={styles.myName}>Oleg</span></h1>
      <h3 className={`${styles.projectTitle} ${smallDevices && styles.projectTitleSD}`}> <span className={styles.react}>React</span> project</h3>
      <hr className={styles.line} />
      {children}
   </div>

   )
}

export default Home