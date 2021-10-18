import React from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import urlValue from 'utils/functions'
import { IModalWindowProps } from 'utils/interface'
import styles from './CreateTaskModalWindow.module.scss'
import { TASKS_CONTENT_VALIDATION } from '../../utils/validation'
import { BoardStore } from '../../stores'
import { Button } from '..'

interface IOnSubmitProps {
  text: string
}

const CreateTaskModalWindow: React.FC<IModalWindowProps> = ({
  isModalOpened,
  onModalClose,
  id,
}) => {
  const { t } = useTranslation()

  const { projectId } = urlValue(window.location.href)
  // const projectId = urlValue(window.location.href).projectId

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    BoardStore.pushTask(data.text, id, projectId)
  }

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={onModalClose}
      />
      <div
        className={`${styles.createArea} ${
          isModalOpened && styles.openedCreate
        }`}
      >
        <div className={styles.modalBody}>
          <div className={styles.form}>
            <div className={styles.closeIconPosition}>
              <Button onClick={onModalClose}>
                <div className={styles.closeIcon} />
              </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.cardText}>
                <span className={styles.text}>{t('modal.taskTitle')}</span>
                <br />
                <textarea
                  {...register('text', TASKS_CONTENT_VALIDATION)}
                  placeholder={t('modal.contentPlaceholder')}
                  className={styles.textInput}
                />
                {errors.text?.message && (
                  <p className={styles.errorPosition}>{errors.text?.message}</p>
                )}
              </div>
              <Button buttonStyle='fifthButtonStyle'>
                <span className={styles.button}>{t('modal.addTask')}</span>
              </Button>
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
    </>
  )
}

export default observer(CreateTaskModalWindow)
