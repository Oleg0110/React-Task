import styles from "./Home.module.scss"
import { useHistory } from "react-router"
import { Button } from "../../components"
import { useAuth, useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE, ROUTES } from "../../utils/constants"

const Home = ({ children }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const history = useHistory()
   const { token } = useAuth()
   const isAuthenticated = !!token

   const attention = !isAuthenticated ? "If you wont to make project, please Sign up or Log In" : "Create your first Project"
   const attentionSignUpButton = !isAuthenticated ? "Let's Go" : "Make Project"
   const attentionLink = !isAuthenticated ? ROUTES.userAauthLogIn : ROUTES.projects

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
         <span className={styles.buttonName}>{attentionSignUpButton}
         </span>
      </Button>
      {children}
   </div >

   )
}

export default Home