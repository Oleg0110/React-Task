import styles from "./Accordion.module.scss"
import { Button } from ".."
import { Chevron } from ".."
import { useState } from "react"
import { ProjectsStore } from "../../stores"
import { observer } from "mobx-react"

const Accordion = ({ title, content }) => {

   const [isOpened, setIsOpened] = useState("")

   return (
      <div className={styles.accordionSection}>
         <div className={`${styles.accordion} `} onClick={() => setIsOpened(!isOpened)}>
            <Button>
               <p className={styles.accordionTitle}>{title}</p>
            </Button>
            <Chevron icon="chevronRight" />
            {/* <div className={`${styles.chevronRight} ${setRotate}`} alt="Arrow"></div> */}
         </div>
         <div className={`${styles.accordionContent} ${isOpened && styles.opened} `}>
            <div className={styles.goTo}>
               <p className={styles.contentTitle}>{title}</p>
               <Button buttonStyle="fifthButtonStyle">Go to Project</Button>
            </div>
            <div className={styles.accordionText}>{content}</div>
         </div>
      </div >
   )
}

export default observer(Accordion)