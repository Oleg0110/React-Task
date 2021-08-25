import styles from "./CreateTaskModalWindow.module.scss"
import { Button } from ".."
import { BoardStore } from "../../stores"
import { useRef } from "react"
import { useForm } from "react-hook-form";
import { observer } from "mobx-react"
import { MAIN_VALIDATION } from "../../utils/validation";


const CreateTaskModalWindow = ({ isModalOpened, onModalClose, id }) => {

   // const taskRef = useRef(null)

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      BoardStore.pushTask(data.task, id)
   };

   return (<div className={`${styles.backFon} ${isModalOpened && styles.opened}`}>
      <div className={styles.createArea}>
         <div className={styles.modalBody}>
            <div className={styles.form}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.cardText}>
                     <span className={styles.text}>Card Text</span>
                     <br />
                     <div className={styles.error}>
                        <textarea {...register("task", MAIN_VALIDATION)} type="textarea" placeholder="Text" className={styles.textInput} />
                        {errors.task && <p className={styles.errorPosition}>Required field</p>}
                     </div>
                  </div>
                  <Button
                     // onClick={onModalClose} 
                     buttonStyle="fifthButtonStyle" className={styles.button}>Add Card</Button>
               </form>
               {/* <form onSubmit={(e) => {
                  e.preventDefault()
                  BoardStore.pushTask(taskRef.current.value, id)
               }}>
                  <div className={styles.cardText}>
                     <span className={styles.text}>Card Text</span>
                     <br />
                     <textarea type="textarea" placeholder="Text" className={styles.textInput} ref={taskRef} />
                  </div>
                  <div className={styles.value}>
                     <div className={styles.box}>
                        <span className={styles.title}>Priority</span>
                        <div className={styles.checkboxPosition}>
                           <label className={styles.optionItem}>
                              <input type="checkbox" className={styles.checkbox} />
                              <div className={styles.optionInner}>
                                 <div className={styles["priority-hight"]}></div>
                                 <p className={styles.hight}>Hight</p>
                              </div>
                           </label>
                           <label className={styles.optionItem}>
                              <input type="checkbox" className={styles.checkbox} />
                              <div className={styles.optionInner}>
                                 <div className={styles["priority-medium"]}></div>
                                 <p className={styles.medium}>Medium</p>
                              </div>
                           </label>
                           <label className={styles.optionItem}>
                              <input type="checkbox" className={styles.checkbox} />
                              <div className={styles.optionInner}>
                                 <div className={styles["priority-low"]}></div>
                                 <p className={styles.low}>Low</p>
                              </div>
                           </label>
                        </div>
                     </div>
                     <div className={styles.box}>
                        <span className={styles.title}>State</span>
                        <div className={styles.checkboxPosition}>
                           <label className={styles.optionItem}>
                              <input type="checkbox" className={styles.checkbox} />
                              <div className={styles.optionInner}>
                                 <div className={styles["state-done"]}></div>
                                 <p className={styles.done}>Done</p>
                              </div>
                           </label>
                           <label className={styles.optionItem}>
                              <input type="checkbox" className={styles.checkbox} />
                              <div className={styles.optionInner}>
                                 <div className={styles["state-fix"]}></div>
                                 <p className={styles.fix}>Fix</p>
                              </div>
                           </label>
                           <label className={styles.optionItem}>
                              <input type="checkbox" className={styles.checkbox} />
                              <div className={styles.optionInner}>
                                 <div className={styles["state-progress"]}></div>
                                 <p className={styles.progress}>Progress</p>
                              </div>
                           </label>
                           <label className={styles.optionItem}>
                              <input type="checkbox" className={styles.checkbox} />
                              <div className={styles.optionInner}>
                                 <div className={styles["state-bug"]}></div>
                                 <p className={styles.bug}>Bug</p>
                              </div>
                           </label>
                        </div>
                     </div>
                  </div>
                  <div className={styles.labelBox}>
                     <span className={styles.title}>Label</span>
                     <div className={styles.labelcheckboxPosition}>
                        <label className={styles.labelOptionItem}>
                           <input type="checkbox" className={styles.checkbox} />
                           <div className={styles.optionInner}>
                              <p className={styles.firstLabelStyle}>SPACE TRAVEL PARTNERS</p>
                           </div>
                        </label>
                        <label className={styles.labelOptionItem}>
                           <input type="checkbox" className={styles.checkbox} />
                           <div className={styles.optionInner}>
                              <p className={styles.thirdLabelStyle}>LOCAL MARS OFFICE</p>
                           </div>
                        </label>
                        <label className={styles.labelOptionItem}>
                           <input type="checkbox" className={styles.checkbox} />
                           <div className={styles.optionInner}>
                              <p className={styles.secondLabelStyle}>SEESPACEEZ PLUS</p>
                           </div>
                        </label>
                        <label className={styles.labelOptionItem}>
                           <input type="checkbox" className={styles.checkbox} />
                           <div className={styles.optionInner}>
                              <p className={styles.fourthLabelStyle}>LARGE TEAM SUPPORT</p>
                           </div>
                        </label>
                     </div>
                  </div>
                  <Button buttonStyle="fifthButtonStyle" className={styles.button}>Add Card</Button>

               </form> */}
            </div>
         </div>
      </div>
   </div >
   )
}


export default observer(CreateTaskModalWindow)