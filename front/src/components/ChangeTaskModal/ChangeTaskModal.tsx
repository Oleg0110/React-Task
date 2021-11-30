import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import urlValue from '../../utils/functions'
import { IModalWindowProps } from '../../utils/interface'
import { Button, TextBox, FindAsigneeUser, UserSearch } from '..'
import { CREATE_CONTENT_VALIDATION } from '../../utils/validation'
import useStore from '../../hooks/useStore'
import { noAsignee } from '../../utils/constants'
import styles from './ChangeTaskModal.module.scss'

interface IChangeTaskModalProps extends IModalWindowProps {
  columnId: string
  asigneeUserEmail?: string
  asigneeUserId?: string
  setIsModalOpened: (boolean: boolean) => void
}

interface IOnSubmitProps {
  text: string
}

const ChangeTaskModal: React.FC<IChangeTaskModalProps> = ({
  isModalOpened,
  setIsModalOpened,
  id,
  columnId,
  asigneeUserEmail,
  asigneeUserId,
}) => {
  const { boardStore, userStore } = useStore()
  const { userSearch, userId, getUsersOnProject, searchAsigneeUser } = userStore
  const { changeTask, asigneeUser, deleteAsigneeUser } = boardStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  useEffect(() => {
    getUsersOnProject(projectId)
  }, [getUsersOnProject, projectId])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    changeTask(data.text, id, columnId)
    setIsModalOpened(false)
  }

  const search = (data: IOnSubmitProps) => {
    searchAsigneeUser(data.text, projectId)
  }

  const deleteAsignee = () => {
    if (asigneeUserId) {
      deleteAsigneeUser(noAsignee, id, projectId, asigneeUserId, columnId)
    }
    setIsModalOpened(false)
  }

  const aigneeModalBody = () => {
    if (asigneeUserEmail === noAsignee) {
      return styles.modalBody
    }
    return styles.aigneeModalBody
  }

  const asigneeToME = () => {
    asigneeUser(userId, id, projectId, columnId)

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
        <div className={aigneeModalBody()}>
          <div className={styles.closeIconPosition}>
            <Button onClick={() => setIsModalOpened(false)}>
              <div className={styles.closeIcon} />
            </Button>
          </div>
          {asigneeUserEmail === noAsignee && (
            <div className={styles.searchArea}>
              <span className={styles.title}>{t('modal.asignee')}</span>
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
                      taskId={id}
                      setIsModalOpened={setIsModalOpened}
                      columnId={columnId}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={asigneeToME}>
                <span className={styles.me}>{t('modal.asigneeMe')}</span>
              </Button>
            </div>
          )}
          {asigneeUserEmail !== noAsignee && (
            <div className={styles.asigneeUserPosition}>
              <p className={styles.asignee}>
                {t('modal.taskAsignee')}
                <span className={styles.userEmail}>{asigneeUserEmail}</span>
                <Button onClick={deleteAsignee}>
                  <div className={styles.deleteUser} />
                </Button>
              </p>
            </div>
          )}
          <hr className={styles.line} />
          <form
            className={styles.descriptionProjectBlock}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextBox
              inputStyle='changeProjectContent'
              placeholder={t('modal.descriptionPlaceholder')}
              label='text'
              register={register}
              error={errors.text?.message}
              errorPosition='changeContenterror'
              required={CREATE_CONTENT_VALIDATION}
            />
            <Button buttonStyle='fifthButtonStyle'>
              {t('modal.changeTask')}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default observer(ChangeTaskModal)
