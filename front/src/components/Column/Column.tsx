import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import { Droppable } from 'react-beautiful-dnd'
import { ITaskType } from 'utils/types'
import { BoardStore } from '../../stores'
import { Button, Task, CreateTaskModalWindow, DeleteColumnModal } from '..'
import { TITLE_VALIDATION } from '../../utils/validation'
import styles from './Column.module.scss'

// !!! ToDo Omit

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
              <button
                type='button'
                className={`${styles.taskTitle} ${
                  isInputOpened && styles.hide
                }`}
                onClick={() => setIsInputOpened(!isInputOpened)}
              >
                {title}
              </button>
              <div className={styles.buttonPosition}>
                <Button
                  onClick={() => setIsTaskModalOpened(!isTaskModalOpened)}
                >
                  <div className={styles.plus} />
                </Button>
                <Button onClick={() => setIsDeleteOpened(!isDeleteOpened)}>
                  <div className={styles.delete} />
                </Button>
              </div>
            </div>
            {taskData?.map((data, index) => (
              <Task
                text={data.text}
                index={index}
                key={data._id}
                id={data._id}
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
