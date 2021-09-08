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
      <div className={styles.logoPosition}>
         <h1 className={`${styles.logo} ${styles[`logo${responsive}`]}`}>DILA</h1>
         <hr className={`${styles.underLine} ${styles[`underLine${responsive}`]}`} />
      </div>
      <h1 className={` ${styles.title} ${styles[`title${responsive}`]}`}>
         My <span className={`${styles.projectTitle} ${styles[`projectTitle${responsive}`]}`}>React project</span>
      </h1>
      <hr className={styles.line} />
      <p className={`${styles.create} ${styles[`create${responsive}`]}`}>Create your first Project</p>
      <div className={styles.buttonPosition}>
         <Button onClick={() => history.push("/sing-up")} buttonStyle="fifthButtonStyle"><span className={styles.buttonName}>Let's Go</span></Button>
      </div>
      {children}
   </div >

   )
}

export default Home