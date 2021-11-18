import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { Button, DeleteTaskModal, ChangeTaskModal } from '..'
import urlValue from '../../utils/functions'
import { stateManager, stateOwner } from '../../utils/constants'
import useStore from '../../hooks/useStore'
import styles from './Task.module.scss'

interface ITaskProps {
  label?: string
  labelStyle?: string
  taskState?: string
  priority?: string
  index: number
  id: string
  columnId: string
  // text: string
  // asigneeUser: string
  // asigneeUserId: string
}

// !!! ToDo Draggable

const Task: React.FC<ITaskProps> = ({
  label,
  labelStyle,
  taskState,
  priority,
  index,
  id,
  columnId,
  // text,
  // asigneeUser,
  // asigneeUserId,
}) => {
  const { userStore, boardStore } = useStore()
  const { usersOnProject, userId } = userStore
  const { column } = boardStore

  const foundTask = column
    ?.find((found) => found.id === columnId)
    ?.tasks.find((found) => found.id === id)

  // const foundede = column?.find((found) => found.id === columnId)
  // const [text] = foundede?.tasks
  // console.log(1, toJS(column))
  // console.log(2, toJS(task))
  // console.log(3, toJS(foundTask))

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  const { t } = useTranslation()

  const [isOpened, setIsOpened] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)

  const { text, asigneeUser, asigneeUserId } = foundTask!

  const onProject = usersOnProject
    ?.find((found) => found.id === userId)
    ?.projects.find((found) => found.projectId === projectId)

  const state =
    onProject?.state === stateOwner || onProject?.state === stateManager

  const opanModal = () => {
    if (onProject?.state !== stateOwner && onProject?.state !== stateManager) {
      return setIsModalOpened(false)
    }
    return setIsModalOpened(!isModalOpened)
  }

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => (
        <div
          className={styles.back}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ChangeTaskModal
            id={id}
            columnId={columnId}
            setIsModalOpened={setIsModalOpened}
            isModalOpened={isModalOpened}
            asigneeUserEmail={asigneeUser}
            asigneeUserId={asigneeUserId}
          />
          <DeleteTaskModal
            id={id}
            columnId={columnId}
            onModalClose={() => setIsOpened(false)}
            isModalOpened={isOpened}
          />
          <div
            className={styles.taskCard}
            style={{
              background: snapshot.isDragging ? '#f2ca90' : '#fff',
            }}
          >
            <p className={styles.textPosition}>
              <Button tooltipContent={t('tooltip.change')} onClick={opanModal}>
                <p className={styles.cardText}>{text}</p>
              </Button>
            </p>
            <p className={labelStyle ? styles[labelStyle] : ''}>{label}</p>
            <div className={styles.taskInfo}>
              <div className={styles.stateTable}>
                <div
                  className={`${styles.taskState} ${
                    styles[`taskState-${taskState}`]
                  }`}
                />
                <div
                  className={`${styles.priority} ${
                    styles[`priority-${priority}`]
                  }`}
                />
              </div>
              <div className={styles.deleteBlock}>
                {asigneeUser !== 'no asignee' && (
                  <p className={styles.asignee}>{asigneeUser}</p>
                )}
                {state && (
                  <Button
                    tooltipContent={t('tooltip.delete')}
                    onClick={() => setIsOpened(!isOpened)}
                  >
                    <div className={styles.delete} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* {provided.placeholder} */}
        </div>
      )}
    </Draggable>
  )
}

export default observer(Task)
