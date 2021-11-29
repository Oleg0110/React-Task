import { useContext } from 'react'
import { RootStoreContext } from '../stores/RootStore/RootStore'

function useStore() {
  const context = useContext(RootStoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}

export default useStore
