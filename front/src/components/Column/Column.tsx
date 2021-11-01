import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import urlValue from '../../utils/functions'
import { ITaskType } from '../../utils/types'
import { BoardStore, UserStore } from '../../stores'
import { Button, Task, CreateTaskModalWindow, DeleteColumnModal } from '..'
import { TITLE_VALIDATION } from '../../utils/validation'
import styles from './Column.module.scss'

interface IColumnProps {
  title: string
  columnId: string
  taskData?: ITaskType[]
  index?: number
}

interface IOnSubmitProps {
  title: string
}

const Column: React.FC<IColumnProps> = ({ title, columnId, taskData }) => {
  const { user } = UserStore
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  const [isTaskModalOpened, setIsTaskModalOpened] = useState(false)
  const [isInputOpened, setIsInputOpened] = useState(false)
  const [isDeleteOpened, setIsDeleteOpened] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // const handleOnDragEnd = (result) => {
  //    BoardStore.dragInColumn(result, id)
  // }

  const onSubmit = (data: IOnSubmitProps) => {
    BoardStore.changeColumn(data.title, columnId)
  }

  const owner = user?.projects.find(
    (found: any) => found.projectId === projectId,
  )

  const userState = () => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      return styles.none
    }
    return styles.block
  }

  const changeTitle = () => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      return setIsInputOpened(false)
    }
    return setIsInputOpened(!isInputOpened)
  }

  return (
    <div>
      <DeleteColumnModal
        id={columnId}
        onModalClose={() => setIsDeleteOpened(false)}
        isModalOpened={isDeleteOpened}
      />
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className={styles.taskBoard}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <CreateTaskModalWindow
              id={columnId}
              isModalOpened={isTaskModalOpened}
              onModalClose={() => setIsTaskModalOpened(false)}
            />
            <div className={styles.taskInfo}>
              <form
                className={`${styles.inputPositon} ${
                  isInputOpened && styles.opened
                }`}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={styles.inputPositonError}>
                  <input
                    {...register('title', TITLE_VALIDATION)}
                    autoComplete='off'
                    type='text'
                    defaultValue={title}
                    className={styles.input}
                  />
                  {errors.title?.message && (
                    <p className={styles.errorPosition}>
                      {errors.title?.message}
                    </p>
                  )}
                </div>
                <button
                  type='button'
                  className={styles.clickOutside}
                  onClick={() => setIsInputOpened(false)}
                />
              </form>
              <Button
                onClick={changeTitle}
                tooltipContent={t('tooltip.change')}
              >
                <p
                  className={`${styles.taskTitle} ${
                    isInputOpened && styles.hide
                  }`}
                >
                  {title}
                </p>
              </Button>
              <div className={userState()}>
                <div className={styles.buttonPosition}>
                  <Button
                    tooltipContent={t('tooltip.plus')}
                    onClick={() => setIsTaskModalOpened(!isTaskModalOpened)}
                  >
                    <div className={styles.plus} />
                  </Button>
                  <Button
                    tooltipContent={t('tooltip.delete')}
                    onClick={() => setIsDeleteOpened(!isDeleteOpened)}
                  >
                    <div className={styles.delete} />
                  </Button>
                </div>
              </div>
            </div>
            {taskData?.map((data, index) => (
              <Task
                text={data.text}
                index={index}
                key={data.id}
                id={data.id}
                columnId={columnId}
                asigneeUserEmail={data.asigneeUser}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default observer(Column)
