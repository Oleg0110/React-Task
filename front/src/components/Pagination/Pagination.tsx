import React from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { NO_EMPTY_VALIDATION } from '../../utils/validation'
import { Button } from '..'
import { ROUTES } from '../../utils/constants'
import useStore from '../../hooks/useStore'
import styles from './Pagination.module.scss'

interface IPaginationProps {
  usersOnPage: number
  setCurrentPage: (number: number) => void
  currentPage: number
}

interface IOnSubmitProps {
  number: number
}

const Pagination: React.FC<IPaginationProps> = ({
  usersOnPage,
  setCurrentPage,
  currentPage,
}) => {
  const { userStore } = useStore()
  const { usersPagination, asyncGetUsers } = userStore

  const { t } = useTranslation()
  const history = useHistory()

  const { register, handleSubmit } = useForm()

  const pageNumbers: number[] = usersPagination?.pageNumbers || []

  const nextPage = () => {
    if (pageNumbers.length !== currentPage) {
      const nextCurrentPage = +currentPage + 1

      asyncGetUsers(nextCurrentPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${nextCurrentPage}&count=${usersOnPage}`,
      )

      setCurrentPage(nextCurrentPage)
    } else {
      toast.error('last page')

      const currentNextPage = pageNumbers.length

      asyncGetUsers(currentNextPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${currentNextPage}&count=${usersOnPage}`,
      )

      setCurrentPage(currentNextPage)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      const prevCurrentPage = currentPage - 1

      asyncGetUsers(prevCurrentPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${prevCurrentPage}&count=${usersOnPage}`,
      )

      setCurrentPage(prevCurrentPage)
    } else {
      toast.error('first page')

      const currentPrevPage = 1

      asyncGetUsers(currentPrevPage, usersOnPage)
      history.push(
        `${ROUTES.people}?page=${currentPrevPage}&count=${usersOnPage}`,
      )

      setCurrentPage(currentPrevPage)
    }
  }

  const onSubmit = (data: IOnSubmitProps) => {
    if (data.number <= pageNumbers.length && data.number > 0) {
      setCurrentPage(data.number)

      asyncGetUsers(data.number, usersOnPage)

      return history.push(
        `${ROUTES.people}?page=${data.number}&count=${usersOnPage}`,
      )
    }
    return toast.error('Sorry page not found')
  }

  return (
    <div className={styles.numberField}>
      <div className={styles.chooseField}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.backInputFon}>
            <span className={styles.choose}>{t('people.choose')}</span>
            <input
              className={styles.chooseInput}
              type='text'
              autoComplete='off'
              pattern='^-?[0-9]\d*\.?\d*$'
              min={1}
              maxLength={3}
              {...register('number', NO_EMPTY_VALIDATION)}
            />
          </div>
        </form>
        <div className={styles.arrowBack}>
          <div className={styles.arrowField}>
            <div className={styles.buttonsField}>
              <Button onClick={prevPage}>
                <div className={styles.prev} />
              </Button>
              <div className={styles.pages}>
                <span className={styles.currentPage}>{currentPage}</span>
                <span className={styles.of}>{t('people.of')}</span>
                <span className={styles.numberPage}>{pageNumbers.length}</span>
              </div>
              <Button onClick={nextPage}>
                <div className={styles.next} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Pagination)
