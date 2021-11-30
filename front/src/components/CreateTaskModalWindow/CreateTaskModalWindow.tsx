import React from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import urlValue from '../../utils/functions'
import { IModalWindowProps } from '../../utils/interface'
import { CREATE_CONTENT_VALIDATION } from '../../utils/validation'
import { Button, TextBox } from '..'
import useStore from '../../hooks/useStore'
import styles from './CreateTaskModalWindow.module.scss'

interface IOnSubmitProps {
  text: string
}

interface ICreateTaskModalWindowProps extends IModalWindowProps {
  setIsModalOpened: (boolean: boolean) => void
}

const CreateTaskModalWindow: React.FC<ICreateTaskModalWindowProps> = ({
  isModalOpened,
  setIsModalOpened,
  id,
}) => {
  const { boardStore } = useStore()
  const { pushTask } = boardStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    pushTask(data.text, id, projectId)
    setIsModalOpened(false)
  }

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={() => setIsModalOpened(false)}
        aria-label='Open Modal Window'
      />
      <div
        className={`${styles.createArea} ${
          isModalOpened && styles.openedCreate
        }`}
      >
        <div className={styles.modalBody}>
          <div className={styles.form}>
            <div className={styles.closeIconPosition}>
              <Button onClick={() => setIsModalOpened(false)}>
                <div className={styles.closeIcon} />
              </Button>
            </div>
            {/* <div className={styles.searchArea}>
              <span className={styles.text}>Asignee someone</span>
              <div className={styles.inputPositon}>
                <UserSearch onSubmit={search} />
              </div>
              <div className={styles.foundUserField}>
                <div className={styles.scroll}>
                  {userSearch?.map((data) => (
                    <FindAsigneeUser
                      id={data.id}
                      name={data.name}
                      email={data.email}
                      key={data.id}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.asigneeInfo}>
                <p className={styles.asignee}>
                  Asignee:
                  <span> bebe@gmail.com</span>
                </p>
                <Button>
                  <span className={styles.me}>Asignee to me</span>
                </Button>
              </div>
            </div>
            <hr className={styles.line} /> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.cardText}>
                <span className={styles.text}>{t('modal.taskTitle')}</span>
                <TextBox
                  inputStyle='textInput'
                  placeholder={t('modal.contentPlaceholder')}
                  label='text'
                  register={register}
                  error={errors?.text?.message}
                  errorPosition='errorContentPosition'
                  required={CREATE_CONTENT_VALIDATION}
                />
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
                     <textarea type="textarea" placeholder="Text"
                      className={styles.textInput} ref={taskRef} />
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
