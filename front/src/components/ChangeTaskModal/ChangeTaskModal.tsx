import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import urlValue from '../../utils/functions'
import { IModalWindowProps } from '../../utils/interface'
import { Button, TextBox, FindAsigneeUser, UserSearch } from '..'
import { BoardStore, UserStore } from '../../stores'
import { CREATE_CONTENT_VALIDATION } from '../../utils/validation'
import styles from './ChangeTaskModal.module.scss'

interface IChangeTaskModalProps extends IModalWindowProps {
  columnId: string
  asigneeUserEmail?: string
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
}) => {
  const { user, userSearch, userId } = UserStore
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  useEffect(() => {
    UserStore.getUsersOnProject(projectId)
  }, [projectId])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: IOnSubmitProps) => {
    BoardStore.changeTask(data.text, id, columnId)
  }

  const owner = user?.projects.find(
    (found: any) => found.projectId === projectId,
  )

  const search = (data: IOnSubmitProps) => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      toast.error('Sorry you are not owner')
    } else {
      UserStore.searchAsigneeUser(data.text, projectId)
    }
  }

  const deleteAsigneeUser = () => {
    const noAsignee = 'no asignee'
    BoardStore.deleteAsigneeUser(noAsignee, id)
    setIsModalOpened(false)
  }

  const aigneeModalBody = () => {
    if (asigneeUserEmail === 'no asignee') {
      return styles.modalBody
    }
    return styles.aigneeModalBody
  }

  const asigneeInfo = () => {
    if (asigneeUserEmail !== 'no asignee') {
      return styles.none
    }
    return styles.block
  }

  const asigneeToME = () => {
    BoardStore.setAsigneeUser(userId, id)
    setIsModalOpened(false)
  }

  const asignee = () => {
    if (asigneeUserEmail === 'no asignee') {
      return styles.none
    }
    return styles.asignee
  }

  return (
    <>
      <button
        type='button'
        className={`${styles.backFon} ${isModalOpened && styles.opened}`}
        onClick={() => setIsModalOpened(false)}
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
          <div className={styles.searchArea}>
            <div className={asigneeInfo()}>
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
                    />
                  ))}
                </div>
              </div>
              <Button onClick={asigneeToME}>
                <span className={styles.me}>{t('modal.asigneeMe')}</span>
              </Button>
            </div>
            <div className={styles.asigneeUserPosition}>
              <p className={asignee()}>
                {t('modal.taskAsignee')}
                <span className={styles.userEmail}>{asigneeUserEmail}</span>
                <Button onClick={deleteAsigneeUser}>
                  <div className={styles.deleteUser} />
                </Button>
              </p>
            </div>
          </div>
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
