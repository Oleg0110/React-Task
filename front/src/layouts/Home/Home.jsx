import { useHistory } from "react-router"
import { Button } from "../../components"
// import { useMediaQuery } from "../../hooks"
import useMedia from "../../hooks/useMedia2"
// import { MEDIUM_DEVICES, SMALL_DEVICES } from "../../utils/constants"
import styles from "./Home.module.scss"

const Home = ({ children }) => {

   const columnCount = useMedia(
      ["(max-width: 576px)", "(max-width: 768px)", "(max-width: 992px)"],
      ["SD", "MD", "LD"],
      "Another"
   );

   // const smallDevices = useMediaQuery(SMALL_DEVICES)
   // const mediumDevices = useMediaQuery(MEDIUM_DEVICES)
   const history = useHistory()

   return (<div className={styles.backFon}>
      <h1 className={styles[`title${columnCount}`]}>My name is <span className={styles.myName}>Oleg</span></h1>
      <h3 className={styles[`projectTitle${columnCount}`]}> <span className={styles.react}>React</span> project</h3>
      <hr className={styles.line} />
      <p className={styles[`create${columnCount}`]}>Create your first Project</p>
      <Button onClick={() => history.push("/projects")} buttonStyle="fifthButtonStyle"><span className={styles.buttonName}>Let's Go</span></Button>
      {children}
   </div >

   )
}

export default Home