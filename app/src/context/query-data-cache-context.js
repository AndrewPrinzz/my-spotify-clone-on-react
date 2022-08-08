import React from 'react'

// cache reducer
function queryDataCacheReducer(state, action) {
  switch (action.type) {
    case 'ADD_QUERY': {
      return {...state, [action.searchQuery]: action.searchQueryData }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// creating context and doing basic things
const QueryDataCacheContext = React.createContext()
QueryDataCacheContext.displayName = 'QueryDataCacheContext'

function QueryDataCacheProvider(props) {
  const [cache, dispatch] = React.useReducer(queryDataCacheReducer, {})
  return <QueryDataCacheContext.Provider value={[cache, dispatch]} {...props} />
}

function useQueryDataCache() {
  const context = React.useContext(QueryDataCacheContext)
  if (!context) {
    throw new Error(
      'useQueryDataCache must be used within a QueryDataCacheProvider'
    )
  }
  return context
}

export {
  QueryDataCacheProvider,
  useQueryDataCache
}