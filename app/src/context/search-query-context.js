import React from "react"

const SearchQueryContext = React.createContext()
SearchQueryContext.displayName = 'SearchQuery'

function SearchQueryProvider(props) {
  const [query, setQuery] = React.useState()

  const value = [query, setQuery]

  return <SearchQueryContext.Provider value={value} {...props} />
}

function useSearchQuery() {
  const context = React.useContext(SearchQueryContext)
  if (!context) {
    throw new Error(`SearchQuery must be rendered within the PlayerProvider`)
  }
  return context
}

export {
  SearchQueryProvider,
  useSearchQuery
}