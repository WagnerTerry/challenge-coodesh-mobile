import React from 'react'
import { AppRoutes } from './src/routes/app.routes'
import { WordsProvider } from './src/context/WordsContext'

const App = () => {

  return (
    <WordsProvider>
      <AppRoutes />
    </WordsProvider>
  )
}

export default App
