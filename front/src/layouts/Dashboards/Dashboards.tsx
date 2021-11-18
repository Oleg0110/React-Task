import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import urlValue from '../../utils/functions'
import { Button, CreateColumnModalWindow, Column } from '../../components'
import useMedia from '../../hooks/useMedia'
import {
  stateManager,
  stateOwner,
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
  ROUTES,
} from '../../utils/constants'
import useStore from '../../hooks/useStore'
import styles from './Dashboards.module.scss'

const Dashboards: React.FC = ({ children }) => {
  const { userStore, projectStore, boardStore } = useStore()
  const { usersOnProject, userId, getUsersOnProject } = userStore
  const { asyncGetProjects, projects } = projectStore
  const { column, asyncGetColumn, dragColumn } = boardStore

  const history = useHistory()

  const { projectId } = urlValue(history.location.pathname)

  useEffect(() => {
    asyncGetColumn(projectId)
    asyncGetProjects()
    getUsersOnProject(projectId)
  }, [asyncGetColumn, asyncGetProjects, getUsersOnProject, projectId])

  const { t } = useTranslation()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const foundProject = projects.find((found) => found.id === projectId)

  const searchValue = useRef<HTMLInputElement>(null)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')

  const filteredColumn = column.map((data) => {
    const filteredTask = data.tasks.filter((name) => {
      const text = name.text.includes(searchTitle)
      return text
    })
    return { ...data, tasks: filteredTask }
  })

  const handleOnDragEnd = (result: DropResult) => {
    dragColumn(result)
  }

  const onProject = usersOnProject
    ?.find((found) => found.id === userId)
    ?.projects.find((found) => found.projectId === projectId)

  const state =
    onProject?.state === stateOwner || onProject?.state === stateManager

  return (
    <div className={styles.mainBoardStyle}>
      <CreateColumnModalWindow
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
      />
      <div className={styles.boardStyle}>
        <h2 className={styles.mainTitle}>{t('dashboards.title')}</h2>
        <div className={styles.ownerField}>
          <p className={styles.owner}>
            {t('dashboards.owner')}
            <span className={styles.ownerEmail}>{foundProject?.userEmail}</span>
          </p>
        </div>
      </div>
      <div className={`${styles.create} ${styles[`create${responsive}`]}}`}>
        {state && (
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
        )}

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
        <div className={styles.buttonPosition}>
          <Button
            onClick={() => {
              history.push(
                `${ROUTES.manageProject}${ROUTES.dashboard}/${projectId}`,
              )
            }}
            tooltipContent={t('tooltip.manageProject')}
          >
            <div className={styles.team} />
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={styles.boardColumn}>
          {column.length === 0 && <div className={styles.loader} />}
          {filteredColumn.map((data) => (
            <Column taskData={data.tasks} key={data.id} columnId={data.id} />
          ))}
        </div>
      </DragDropContext>
      {children}
    </div>
  )
}

export default observer(Dashboards)
