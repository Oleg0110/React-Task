import styles from "./AddTaskModalWindow.module.scss"
import Button from "../Button/Button"
import BoardStore from "../../stores/BoardStore/BoardStore"
import { useRef } from "react"
import { observer } from "mobx-react"


const AddTaskModalWindow = ({ isModalOpened, onModalClose }) => {

   const ref = useRef(null)

   return (<div className={`${styles.backFon} ${isModalOpened && styles.opened}`}>
      <div className={styles.modalBody}>
         <div className={styles.form}>
            <div className={styles.closeIconPosition}>
               <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
            </div>
            <form onSubmit={(e) => {
               e.preventDefault()
               BoardStore.pushTask(ref.current.value)
               console.log(BoardStore.lists.length);
            }}>
               <div className={styles.cardText}>
                  <span className={styles.text}>Card Text</span>
                  <br />
                  <textarea type="textarea" placeholder="Text" className={styles.textInput} ref={ref} />
               </div>
               <div className={styles.value}>
                  <div className={styles.box}>
                     <span className={styles.title}>Priority :</span>
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
                     <span className={styles.title}>State :</span>
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
               <div className={styles.NEZNAU}>
                  <h3 className={styles.title}>NEZNAU</h3>
               </div>
               <Button buttonStyle="thirdButtonStyle" className={styles.button}>Add Card</Button>
            </form>
         </div>
      </div>
   </div >
   )
}


export default observer(AddTaskModalWindow)