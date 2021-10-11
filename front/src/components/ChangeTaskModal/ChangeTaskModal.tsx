import React from "react";
import { Button } from ".."
import { BoardStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { CREATE_CONTENT_VALIDATION } from "../../utils/validation";
import styles from "./ChangeTaskModal.module.scss"

interface IChangeTaskModal extends IModalWindow {
   listId: string,
}

interface IData {
   text: string,
}

const ChangeTaskModal: React.FC<IChangeTaskModal> = ({ isModalOpened, onModalClose, id, listId }) => {

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = (data: IData) => {
      BoardStore.changeTask(data.text, id, listId)
   }

   return (
      <>
         <div className={`${styles.backFon} ${isModalOpened && styles.opened}`} onClick={onModalClose} />
         <div className={`${styles.createArea} ${isModalOpened && styles.openedCreate}`}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}>
                     <div className={styles.closeIcon} />
                  </Button>
               </div>
               <form className={styles.descriptionProjectBlock} onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                     {...register("text", CREATE_CONTENT_VALIDATION)}
                     placeholder="Description" className={styles.inputText} />
                  {errors.text?.message && <p className={styles.errorPosition}>
                     {errors.text?.message}
                  </p>}
                  <Button buttonStyle="fifthButtonStyle">Change Task</Button>
               </form>
            </div>
         </div>
      </>
   )
}


export default observer(ChangeTaskModal)