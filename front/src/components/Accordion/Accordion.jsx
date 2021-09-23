import styles from "./Accordion.module.scss"
import { Button, DeleteProjectModal, ChangeProjectTitleModal, ChangeProjectContentModal } from ".."
import { useState } from "react"
import { observer } from "mobx-react"
import { useHistory } from "react-router"
import { ROUTES } from "../../utils/constants"

const Accordion = ({ title, content, id }) => {

   const [isOpened, setIsOpened] = useState(false)
   const [isOptionsOpened, setIsOptionsOpened] = useState(false)
   const [isDeleteOpened, setIsDeleteOpened] = useState(false)
   const [isChangeTitleOpened, setIsChangeTitleOpened] = useState(false)
   const [isContentTitleOpened, setIsContentTitleOpened] = useState(false)
   const history = useHistory()



   return (
      <div className={styles.accordionSection}>
         <DeleteProjectModal id={id} onModalClose={() => setIsDeleteOpened(false)} isModalOpened={isDeleteOpened} />
         <ChangeProjectTitleModal id={id} onModalClose={() => setIsChangeTitleOpened(false)} isModalOpened={isChangeTitleOpened} />
         <ChangeProjectContentModal id={id} onModalClose={() => setIsContentTitleOpened(false)} isModalOpened={isContentTitleOpened} />
         <div className={`${styles.accordion} `} onClick={() => setIsOpened(!isOpened)}>
            <Button>
               <p className={styles.accordionTitle}>{title}</p>
            </Button>
            <div className={`${styles.chevronRight} ${isOpened && styles.chevronDown}`} alt="Arrow"></div>
         </div>
         <div className={`${styles.accordionContent} ${isOpened && styles.opened} `}>
            <div className={styles.goTo}>
               <p className={styles.contentTitle}>{title}</p>
               <div className={styles.buttonsField}>
                  <Button onClick={() => history.push(`${ROUTES.dashboard}/${id}`)} buttonStyle="fifthButtonStyle">Go to Project</Button>
                  <Button onClick={() => setIsOptionsOpened(!isOptionsOpened)}><div className={styles.threeDots} alt="Dots" /></Button>
               </div>
               <div className={`${styles.infoButtonsBackFon} ${isOptionsOpened && styles.infoButtonsOpened}`}>
                  <div className={styles.infoButtons}>
                     <Button onClick={() => setIsChangeTitleOpened(!isChangeTitleOpened)}>
                        <span className={styles.buttonStyle}>Change Title</span>
                     </Button>
                     <Button onClick={() => setIsContentTitleOpened(!isContentTitleOpened)}>
                        <span className={styles.buttonStyle}>Change Content</span>
                     </Button>
                     <Button onClick={() => setIsDeleteOpened(!isDeleteOpened)}>
                        <span className={styles.buttonStyle}>Delete Project</span>
                     </Button>
                  </div>
               </div>
            </div>
            <div className={styles.accordionText}>
               {content}
            </div>
         </div>
      </div >
   )
}

export default observer(Accordion)