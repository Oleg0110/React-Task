import styles from "./Home.module.scss"
import { useHistory } from "react-router"
import { Button } from "../../components"
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"

const Home = ({ children }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   console.log(responsive);

   const history = useHistory()

   return (<div className={styles.backFon}>
      <h1 className={` ${styles.title} ${styles[`title${responsive}`]}`}>My name is <span className={styles.myName}>Oleg</span></h1>
      <h3 className={`${styles.projectTitle} ${styles[`projectTitle${responsive}`]}`}> <span className={styles.react}>React</span> project</h3>
      <hr className={styles.line} />
      <p className={`${styles.create} ${styles[`create${responsive}`]}`}>Create your first Project</p>
      <Button onClick={() => history.push("/projects")} buttonStyle="fifthButtonStyle"><span className={styles.buttonName}>Let's Go</span></Button>
      {children}
   </div >

   )
}

export default Home