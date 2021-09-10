import styles from "./Home.module.scss"
import { useHistory } from "react-router"
import { Button } from "../../components"
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"
import { UserStore } from "../../stores"

const Home = ({ children }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const history = useHistory()

   const { user } = UserStore

   const attention = !user.length ? "If you wont to make project, please register" : "Create your first Project"
   const attentionButton = !user.length ? "Sign up" : "Let's Go"
   const attentionLink = !user.length ? "/user/sign-up" : "projects"

   return (<div className={styles.backFon}>
      <div className={styles.logoPosition}>
         <h1 className={`${styles.logo} ${styles[`logo${responsive}`]}`}>DILA</h1>
         <hr className={`${styles.underLine} ${styles[`underLine${responsive}`]}`} />
      </div>
      <h1 className={` ${styles.title} ${styles[`title${responsive}`]}`}>
         My <span className={`${styles.projectTitle} ${styles[`projectTitle${responsive}`]}`}>React project</span>
      </h1>
      <hr className={styles.line} />
      <p className={`${styles.create} ${styles[`create${responsive}`]}`}>{attention}</p>
      <Button onClick={() => history.push(attentionLink)} buttonStyle="fifthButtonStyle">
         <span className={styles.buttonName}>{attentionButton}
         </span>
      </Button>
      {children}
   </div >

   )
}

export default Home