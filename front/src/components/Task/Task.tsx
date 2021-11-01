import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Button, DeleteTaskModal, ChangeTaskModal } from '..'
import urlValue from '../../utils/functions'
import { UserStore } from '../../stores'
import styles from './Task.module.scss'

interface ITaskProps {
  text: string
  label?: string
  labelStyle?: string
  taskState?: string
  priority?: string
  index: number
  id: string
  columnId: string
  asigneeUserEmail?: string
}

// !!! ToDo Draggable

const Task: React.FC<ITaskProps> = ({
  text,
  label,
  labelStyle,
  taskState,
  priority,
  index,
  id,
  columnId,
  asigneeUserEmail,
}) => {
  const { user } = UserStore
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  const [isOpened, setIsOpened] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)

  const owner = user?.projects.find(
    (found: any) => found.projectId === projectId,
  )

  const userState = () => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      return styles.none
    }
    return styles.block
  }

  const opanModal = () => {
    if (owner.state !== 'owner' && owner.state !== 'manager') {
      return setIsModalOpened(false)
    }
    return setIsModalOpened(!isModalOpened)
  }

  const asignee = () => {
    if (asigneeUserEmail === 'no asignee') {
      return styles.none
    }
    return styles.block
  }

  return (
    <>
      <ChangeTaskModal
        id={id}
        columnId={columnId}
        setIsModalOpened={setIsModalOpened}
        isModalOpened={isModalOpened}
        asigneeUserEmail={asigneeUserEmail}
      />
      <DeleteTaskModal
        id={id}
        columnId={columnId}
        onModalClose={() => setIsOpened(false)}
        isModalOpened={isOpened}
      />
      <Draggable draggableId={id} index={index} key={id}>
        {(provided, snapshot) => (
          <div
            className={styles.back}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={styles.taskCard}
              style={{
                background: snapshot.isDragging ? '#f2ca90' : '#fff',
              }}
            >
              <p className={styles.textPosition}>
                <Button
                  tooltipContent={t('tooltip.change')}
                  onClick={opanModal}
                >
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
                  <div className={asignee()}>
                    <p className={styles.asignee}>{asigneeUserEmail}</p>
                  </div>
                  <div className={userState()}>
                    <Button
                      tooltipContent={t('tooltip.delete')}
                      onClick={() => setIsOpened(!isOpened)}
                    >
                      <div className={styles.delete} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* {provided.placeholder} */}
          </div>
        )}
      </Draggable>
    </>
  )
}

export default observer(Task)
