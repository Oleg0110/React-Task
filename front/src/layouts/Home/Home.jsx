import { useHistory } from "react-router"
import { Button } from "../../components"
import { useMediaQuery } from "../../hooks"
import { MEDIUM_DEVISCES, SMALL_DEVISCES } from "../../utils/constants"
import styles from "./Home.module.scss"

const Home = ({ children }) => {

   const smallDevices = useMediaQuery(SMALL_DEVISCES)
   const mediumDevices = useMediaQuery(MEDIUM_DEVISCES)
   const history = useHistory()

   return (<div className={styles.backFon}>
      <h1 className={`${styles.title} ${mediumDevices && styles.titleMD} ${smallDevices && styles.titleSD}`}>My name is <span className={styles.myName}>Oleg</span></h1>
      <h3 className={`${styles.projectTitle} ${mediumDevices && styles.projectTitleMD} ${smallDevices && styles.projectTitleSD}`}> <span className={styles.react}>React</span> project</h3>
      <hr className={styles.line} />
      <p className={`${styles.create}  ${mediumDevices && styles.createMD} ${smallDevices && styles.createSD}`}>Create your first Project</p>
      <Button onClick={() => history.push("/projects")} buttonStyle="fifthButtonStyle"><span className={styles.buttonName}>Let's Go</span></Button>
      {children}
   </div>

   )
}

export default Home