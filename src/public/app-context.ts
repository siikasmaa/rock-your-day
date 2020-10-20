import React from 'react'

const defaultContext = { isSSR: false }

export const AppContext = React.createContext(defaultContext)

export const ContextProvider = AppContext.Provider
export const ContextConsumer = AppContext.Consumer
