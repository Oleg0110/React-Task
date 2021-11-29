import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { Droppable } from 'react-beautiful-dnd'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import urlValue from '../../utils/functions'
import { Button, Task, CreateTaskModalWindow, DeleteColumnModal } from '..'
import { TITLE_VALIDATION } from '../../utils/validation'
import { stateManager, stateOwner } from '../../utils/constants'
import { ITask } from '../../utils/interFace'
import useStore from '../../hooks/useStore'
import styles from './Column.module.scss'

interface IColumnProps {
  columnId: string
  taskData: ITask[]
}

interface IOnSubmitProps {
  title: string
}

const Column: React.FC<IColumnProps> = ({ columnId, taskData }) => {
  const { boardStore, userStore } = useStore()
  const { usersOnProject, userId } = userStore
  const { changeColumn, column } = boardStore

  const history = useHistory()
  const { projectId } = urlValue(history.location.pathname)

  const foundColumn = column?.find((data) => data.id === columnId)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { title } = foundColumn!

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
  //    dragInColumn(result, id)
  // }

  const onSubmit = (data: IOnSubmitProps) => {
    changeColumn(data.title, columnId)
    setIsInputOpened(false)
  }

  const onProject = usersOnProject
    ?.find((found) => found.id === userId)
    ?.projects.find((found) => found.projectId === projectId)

  const state =
    onProject?.state === stateOwner || onProject?.state === stateManager

  const changeTitle = () => {
    if (onProject?.state !== stateOwner && onProject?.state !== stateManager) {
      return setIsInputOpened(false)
    }
    return setIsInputOpened(!isInputOpened)
  }

  // console.log(toJS(taskData))

  return (
    <div>
      <DeleteColumnModal
        id={columnId}
        setIsModalOpened={setIsDeleteOpened}
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
              setIsModalOpened={setIsTaskModalOpened}
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
                  aria-label='Close Input'
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
              {state && (
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
              )}
            </div>
            {/* {foundColumn?.tasks?.map((data, index) => (
              <Task
                index={index}
                key={data.id}
                id={data.id}
                columnId={columnId}
              />
            ))} */}
            {taskData?.map((data, index) => (
              <Task
                // text={data.text}
                // asigneeUser={data.asigneeUser}
                // asigneeUserId={data.asigneeUserId}
                index={index}
                key={data.id}
                id={data.id}
                columnId={columnId}
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
