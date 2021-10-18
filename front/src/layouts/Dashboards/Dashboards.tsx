import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import urlValue from 'utils/functions'
import { ITaskType } from 'utils/types'
import { Button, CreateColumnModalWindow, Column } from '../../components'
import { BoardStore } from '../../stores'
import useMedia from '../../hooks/useMedia'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
} from '../../utils/constants'
import styles from './Dashboards.module.scss'

interface IColumnProps {
  title: string
  tasks: ITaskType[]
  _id: string
}

const Dashboards: React.FC = ({ children }) => {
  // const projectId = urlValue(window.location.href).projectId
  const { projectId } = urlValue(window.location.href)

  const { t } = useTranslation()

  useEffect(() => {
    BoardStore.asyncGetColumn(projectId)
  }, [projectId])

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const { column }: { column: IColumnProps[] } = BoardStore

  const searchValue = useRef<HTMLInputElement>(null)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')
  console.log(searchTitle)

  // const filteredColumn = column.map(data => {
  //    const filteredTask = data.tasks.filter(name => name.text.includes(searchTitle))
  //    return { ...data, tasks: filteredTask }
  // })

  const handleOnDragEnd = (result: object) => {
    // BoardStore.dragColumn(result)
    console.log(result)
  }

  return (
    <div className={styles.mainBoardStyle}>
      <CreateColumnModalWindow
        isModalOpened={isModalOpened}
        onModalClose={() => setIsModalOpened(false)}
      />
      <div className={styles.boardStyle}>
        <h2 className={styles.mainTitle}>{t('dashboards.title')}</h2>
        <div className={styles.release}>
          <Button buttonStyle='thirdButtonStyle'>
            {t('dashboards.release')}
          </Button>
          <Button>
            <div className={styles['three-dots']} />
          </Button>
        </div>
      </div>
      <div className={`${styles.create} ${styles[`create${responsive}`]}}`}>
        <div
          className={`${styles.createButtonPosition} ${
            styles[`createButtonPosition${responsive}`]
          }`}
        >
          <Button
            onClick={() => setIsModalOpened(!isModalOpened)}
            buttonStyle='thirdButtonStyle'
          >
            <div className={styles.plus} />
            {t('dashboards.create')}
          </Button>
        </div>
        <form
          className={styles.searchBoardArea}
          onChange={(e) => {
            e.preventDefault()
            if (searchValue.current) {
              setSearchTitle(searchValue.current.value)
            } else {
              console.warn(
                "Strange behavior, i don't know why, but null came here: searchValue",
              )
            }
          }}
        >
          <input
            type='text'
            placeholder={t('dashboards.taskPlaceholder')}
            className={styles.searchInput}
            ref={searchValue}
          />
          <div className={styles.searchIcon} />
          <Button onClick={(e) => e.preventDefault()}>
            <div className={styles.delete} />
          </Button>
        </form>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={styles.boardColumn}>
          {column.map((data, index) => (
            <Column
              taskData={data.tasks}
              title={data.title}
              key={data._id}
              columnId={data._id}
              index={index}
            />
          ))}
        </div>
      </DragDropContext>
      {children}
    </div>
  )
}

export default observer(Dashboards)
