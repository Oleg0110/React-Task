import { Button } from ".."
import { ProjectsStore } from "../../stores"
import styles from "./DeleteProjectModal.module.scss"
import { useTranslation } from "react-i18next";

const DeleteProjectModal = ({ isModalOpened, onModalClose, id }) => {

   const { t } = useTranslation();

   const onClick = () => {
      ProjectsStore.deletedProject(id)
   }

   return (
      <>
         <div className={`${styles.backFon} ${isModalOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createArea} ${isModalOpened && styles.openedCreate}`}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>{t("modal.sure")}</span>
               <Button onClick={onClick} buttonStyle="fifthButtonStyle">{t("modal.delete")}</Button>
            </div>
         </div>
      </>
   )
}

export default DeleteProjectModal